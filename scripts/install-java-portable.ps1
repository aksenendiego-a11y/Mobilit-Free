# Download Temurin OpenJDK 17 as ZIP (portable) and extract
$url = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.11%2B9/OpenJDK17U-jdk_x64_windows_hotspot_17.0.11_9.zip"
$output = "$env:TEMP\openjdk17.zip"
$extractPath = "C:\Program Files\Eclipse Adoptium\jdk-17.0.11.9-hotspot"

Write-Host "Downloading OpenJDK 17 portable..."
try {
    Invoke-WebRequest -Uri $url -OutFile $output -ErrorAction Stop
    Write-Host "Download complete. Extracting..."

    # Create target directory
    if (-not (Test-Path "C:\Program Files\Eclipse Adoptium")) {
        New-Item -ItemType Directory -Force -Path "C:\Program Files\Eclipse Adoptium" | Out-Null
    }

    # Extract ZIP
    Expand-Archive -Path $output -DestinationPath "C:\Program Files\Eclipse Adoptium\" -Force

    Write-Host "OpenJDK 17 extracted to C:\Program Files\Eclipse Adoptium\jdk-17.0.11.9-hotspot"

    # Set JAVA_HOME for current session
    $javaHome = "C:\Program Files\Eclipse Adoptium\jdk-17.0.11.9-hotspot"
    [Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, "User")
    [Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";$javaHome\bin", "User")

    Write-Host "JAVA_HOME set to: $javaHome"
    Write-Host "Please restart your terminal for changes to take effect."

} catch {
    Write-Error "Failed: $_"
}