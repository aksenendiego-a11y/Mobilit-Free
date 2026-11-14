# Download and install Temurin OpenJDK 17
$url = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.11%2B9/OpenJDK17U-jdk_x64_windows_hotspot_17.0.11_9.msi"
$output = "$env:TEMP\openjdk17.msi"

Write-Host "Downloading OpenJDK 17..."
try {
    Invoke-WebRequest -Uri $url -OutFile $output -ErrorAction Stop
    Write-Host "Download complete. Installing..."
    $installArgs = "/i", $output, "/quiet", "ADDLOCAL=FeatureMain,FeatureEnvironment,FeatureJarFileRunWith,FeatureJavaHome"
    $process = Start-Process msiexec.exe -ArgumentList $installArgs -Wait -PassThru
    if ($process.ExitCode -eq 0) {
        Write-Host "OpenJDK 17 installed successfully!"
    } else {
        Write-Error "Installation failed with exit code $($process.ExitCode)"
    }
} catch {
    Write-Error "Download failed: $_"
}