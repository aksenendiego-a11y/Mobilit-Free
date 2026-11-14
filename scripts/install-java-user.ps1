# Download Temurin OpenJDK 17 as ZIP and extract to user directory
$url = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.11%2B9/OpenJDK17U-jdk_x64_windows_hotspot_17.0.11_9.zip"
$output = "$env:TEMP\openjdk17.zip"
$extractPath = "$env:LOCALAPPDATA\Eclipse Adoptium\jdk-17.0.11.9-hotspot"

Write-Host "Downloading OpenJDK 17 portable..."
try {
    Invoke-WebRequest -Uri $url -OutFile $output -ErrorAction Stop
    Write-Host "Download complete. Extracting..."

    # Create target directory in user space
    $targetDir = "$env:LOCALAPPDATA\Eclipse Adoptium"
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
    }

    # Extract ZIP
    Expand-Archive -Path $output -DestinationPath $targetDir -Force

    $javaHome = "$targetDir\jdk-17.0.11.9-hotspot"
    Write-Host "OpenJDK 17 extracted to: $javaHome"

    # Set JAVA_HOME for current session
    [Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, "User")
    $newPath = $env:PATH + ";$javaHome\bin"
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")

    Write-Host "JAVA_HOME set to: $javaHome"
    Write-Host "Please RESTART your terminal (close and reopen) for changes to take effect."

} catch {
    Write-Error "Failed: $_"
}