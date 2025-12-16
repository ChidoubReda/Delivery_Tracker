# Startup Script for Delivery_Tracker

Write-Host "Building project..."
.\mvnw.cmd clean package -DskipTests

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed!"
    exit 1
}

Write-Host "Build successful! Starting services..."

# Function to start a service in a new window
function Start-ServiceWindow {
    param(
        [string]$ServiceName,
        [string]$Path
    )
    Write-Host "Starting $ServiceName..."
    Start-Process -FilePath "java" -ArgumentList "-jar", "target/$ServiceName-0.0.1-SNAPSHOT.jar" -WorkingDirectory "$Path"
}

# Start Config Service first and wait a bit
Write-Host "Starting Configuration Service..."
Start-Process -FilePath "java" -ArgumentList "-jar", "target/configuration_service-0.0.1-SNAPSHOT.jar" -WorkingDirectory "Configuration_Service"
Start-Sleep -Seconds 15

# Start Discovery Service
Write-Host "Starting Discovery Service..."
Start-Process -FilePath "java" -ArgumentList "-jar", "target/discovery_service-0.0.1-SNAPSHOT.jar" -WorkingDirectory "Discovery_Service"
Start-Sleep -Seconds 10

# Start other services
Write-Host "Starting Gateway Service..."
Start-Process -FilePath "java" -ArgumentList "-jar", "target/gateway_service-0.0.1-SNAPSHOT.jar" -WorkingDirectory "gateway_service"

Write-Host "Starting Colis Service..."
Start-Process -FilePath "java" -ArgumentList "-jar", "target/Colis_Service-0.0.1-SNAPSHOT.jar" -WorkingDirectory "Colis_Service"

Write-Host "Starting Livraison Service..."
Start-Process -FilePath "java" -ArgumentList "-jar", "target/livraison-service-0.0.1-SNAPSHOT.jar" -WorkingDirectory "Livraison_Service"

Write-Host "All services started!"
