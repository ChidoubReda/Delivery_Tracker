# Script pour peupler les services Colis et Livraison
$baseUrlColis = "http://localhost:8081"
$baseUrlLivraison = "http://localhost:8082"

# Fonction pour créer un colis
function New-Colis {
    param($tracking, $sender, $recipient, $weight, $status)
    $body = @{
        trackingNumber   = $tracking
        senderName       = $sender
        senderAddress    = "Route de Nouaceur, Casablanca"
        senderEmail      = "contact@sender.com"
        recipientName    = $recipient
        recipientAddress = "Maarif, Rue Al Fourat"
        recipientEmail   = "client@gmail.com"
        weight           = $weight
        status           = $status
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Method Post -Uri "$baseUrlColis/colis" -Body $body -ContentType "application/json"
        Write-Host "Created Colis: $tracking (ID: $($response.id))" -ForegroundColor Green
        return $response.id
    }
    catch {
        Write-Warning "Failed to create item $tracking`: $_"
        return $null
    }
}

# Fonction pour créer une livraison
function New-Livraison {
    param($colisId, $dest, $etat, $coords)
    $body = @{
        colisId            = $colisId
        adresseDestination = $dest
        etat               = $etat
        coordinates        = $coords
    } | ConvertTo-Json

    try {
        Invoke-RestMethod -Method Post -Uri "$baseUrlLivraison/api/livraisons" -Body $body -ContentType "application/json"
        Write-Host "  -> Created Livraison for Colis $colisId" -ForegroundColor Cyan
    }
    catch {
        Write-Warning "  -> Failed delivery for Colis $colisId`: $_"
        # Print detailed error if available
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
            Write-Warning "     Details: $($reader.ReadToEnd())"
        }
    }
}

Write-Host "Creating Colis and Livraisons (Direct Port Access)..." -ForegroundColor Yellow

# Data Set: Realistic Casablanca Coords (Lat, Lng)
# 33.5731, -7.5898 (Centre)
# 33.589, -7.6 (Maarif)
# 33.53, -7.65 (Ain Diab)

$id1 = New-Colis "TRK-2025-001" "Jumia" "Yassine B." 1.5 "SHIPPED"
if ($id1) { New-Livraison $id1 "Maarif, Casablanca" "IN_TRANSIT" "33.589,-7.625" }

$id2 = New-Colis "TRK-2025-002" "Decathlon" "Sarah L." 5.0 "SHIPPED"
if ($id2) { New-Livraison $id2 "Ain Diab, Casa" "IN_TRANSIT" "33.535,-7.650" }

$id3 = New-Colis "TRK-2025-003" "Marjane" "Ahmed K." 12.0 "DELIVERED"
if ($id3) { New-Livraison $id3 "Sidi Maarouf" "DELIVERED" "33.530,-7.630" }

$id4 = New-Colis "TRK-2025-004" "ElectroPlanet" "Omar F." 2.2 "CREATED"
if ($id4) { New-Livraison $id4 "Bernoussi" "PENDING" "33.600,-7.500" }

$id5 = New-Colis "TRK-2025-005" "McDonalds" "Hiba Z." 0.5 "IN_TRANSIT"
if ($id5) { New-Livraison $id5 "Gauthier" "IN_TRANSIT" "33.590,-7.620" }

Write-Host "Done!" -ForegroundColor Green
