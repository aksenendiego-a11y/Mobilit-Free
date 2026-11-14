$url = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.11%2B9/OpenJDK17U-jdk_x64_windows_hotspot_17.0.11_9.msi"
$output = "$env:TEMP\openjdk17.msi"
Write-Host "Downloading OpenJDK 17..."
Invoke-WebRequest -Uri $url -OutFile $output
Write-Host "Installing OpenJDK 17..."
Start-Process msiexec.exe -ArgumentList "/i", $output, "/quiet", "ADDLOCAL=FeatureMain,FeatureEnvironment,FeatureJarFileRunWith,FeatureJavaHome" -Wait
Write-Host "OpenJDK 17 installed successfully!"