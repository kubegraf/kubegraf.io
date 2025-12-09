# KubeGraf Installation Script for Windows
#
# Recommended (one-liner with execution policy fix):
#   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force; irm https://kubegraf.io/install.ps1 | iex
#
# Alternative (bypass execution policy for this script only):
#   Invoke-WebRequest -Uri https://kubegraf.io/install.ps1 -OutFile install.ps1; powershell -ExecutionPolicy Bypass -File install.ps1

$ErrorActionPreference = "Stop"

$REPO = "kubegraf/kubegraf"
$BINARY_NAME = "kubegraf.exe"
$INSTALL_DIR = "$env:LOCALAPPDATA\Programs\KubeGraf"

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
    exit 1
}

function Test-Command {
    param([string]$Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Check dependencies
if (-not (Test-Command "curl.exe") -and -not (Test-Command "Invoke-WebRequest")) {
    Write-Error "curl or Invoke-WebRequest is required but not found. Please install it first."
}

# Detect architecture
function Get-Architecture {
    $arch = $env:PROCESSOR_ARCHITECTURE
    if ($arch -eq "AMD64" -or $arch -eq "x86_64") {
        return "amd64"
    } elseif ($arch -eq "ARM64") {
        return "arm64"
    } else {
        Write-Error "Unsupported architecture: $arch"
    }
}

# Get latest release version
function Get-LatestVersion {
    try {
        $response = Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO/releases/latest" -ErrorAction Stop
        $version = $response.tag_name -replace '^v', ''
        if ([string]::IsNullOrEmpty($version)) {
            Write-Error "Failed to parse version from GitHub API"
        }
        return $version
    } catch {
        Write-Error "Failed to fetch latest version from GitHub API: $_"
    }
}

# Download and install
function Install-KubeGraf {
    param(
        [string]$Version,
        [string]$Arch
    )
    
    $OS = "windows"
    $DOWNLOAD_URL = "https://github.com/$REPO/releases/download/v$Version/${BINARY_NAME}-${OS}-${Arch}.zip"
    $TEMP_DIR = Join-Path $env:TEMP "kubegraf-install"
    $DOWNLOAD_FILE = Join-Path $TEMP_DIR "$BINARY_NAME.zip"
    
    Write-Info "Downloading KubeGraf v$Version for $OS/$Arch..."
    Write-Info "URL: $DOWNLOAD_URL"
    
    # Create temp directory
    if (Test-Path $TEMP_DIR) {
        Remove-Item $TEMP_DIR -Recurse -Force
    }
    New-Item -ItemType Directory -Path $TEMP_DIR -Force | Out-Null
    
    try {
        # Download using Invoke-WebRequest (more reliable on Windows)
        Invoke-WebRequest -Uri $DOWNLOAD_URL -OutFile $DOWNLOAD_FILE -ErrorAction Stop
    } catch {
        Write-Error "Failed to download from $DOWNLOAD_URL : $_"
    }
    
    if (-not (Test-Path $DOWNLOAD_FILE) -or (Get-Item $DOWNLOAD_FILE).Length -eq 0) {
        Write-Error "Downloaded file is empty or missing"
    }
    
    Write-Info "Extracting..."
    try {
        Expand-Archive -Path $DOWNLOAD_FILE -DestinationPath $TEMP_DIR -Force -ErrorAction Stop
    } catch {
        Write-Error "Failed to extract archive: $_"
    }
    
    # Look for the binary (could be kubegraf.exe or just kubegraf)
    $BINARY_PATH = Join-Path $TEMP_DIR $BINARY_NAME
    if (-not (Test-Path $BINARY_PATH)) {
        # Try without .exe extension
        $BINARY_PATH = Join-Path $TEMP_DIR "kubegraf"
        if (-not (Test-Path $BINARY_PATH)) {
            Write-Error "Binary not found in archive"
        }
    }
    
    Write-Info "Installing to $INSTALL_DIR..."
    
    # Create install directory
    if (-not (Test-Path $INSTALL_DIR)) {
        New-Item -ItemType Directory -Path $INSTALL_DIR -Force | Out-Null
    }
    
    # Copy binary
    $INSTALL_PATH = Join-Path $INSTALL_DIR $BINARY_NAME
    Copy-Item -Path $BINARY_PATH -Destination $INSTALL_PATH -Force -ErrorAction Stop
    
    # Add to PATH if not already there
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($currentPath -notlike "*$INSTALL_DIR*") {
        Write-Info "Adding $INSTALL_DIR to PATH..."
        [Environment]::SetEnvironmentVariable("Path", "$currentPath;$INSTALL_DIR", "User")
        $env:Path += ";$INSTALL_DIR"
        Write-Warn "PATH updated. You may need to restart your terminal for changes to take effect."
    }
    
    # Cleanup
    Remove-Item $TEMP_DIR -Recurse -Force -ErrorAction SilentlyContinue
    
    return $INSTALL_PATH
}

# Verify installation
function Test-Installation {
    param([string]$InstallPath)
    
    if (Test-Path $InstallPath) {
        Write-Success "KubeGraf installed successfully!"
        Write-Host ""
        Write-Info "Get started:"
        Write-Host "  kubegraf          # Terminal UI"
        Write-Host "  kubegraf --web    # Web Dashboard"
        Write-Host ""
        Write-Info "Documentation: https://kubegraf.io"
        Write-Host ""
        Write-Warn "If 'kubegraf' is not recognized, restart your terminal or run:"
        Write-Host "  `$env:Path += ';$INSTALL_DIR'"
    } else {
        Write-Error "Installation failed: binary not found at $InstallPath"
    }
}

# Main
Write-Host ""
Write-Host "╔═══════════════════════════════════════╗"
Write-Host "║     KubeGraf Installation Script      ║"
Write-Host "╚═══════════════════════════════════════╝"
Write-Host ""

$ARCH = Get-Architecture
$VERSION = Get-LatestVersion

Write-Info "Detected: windows/$ARCH"
Write-Info "Version: $VERSION"
Write-Host ""

$INSTALL_PATH = Install-KubeGraf -Version $VERSION -Arch $ARCH
Test-Installation -InstallPath $INSTALL_PATH

