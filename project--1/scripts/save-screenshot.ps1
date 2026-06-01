param(
  [string]$OutputDir = "./screenshots"
)

$ErrorActionPreference = "Stop"

# Resolve output directory
$resolvedDir = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($OutputDir)
if (-not (Test-Path $resolvedDir)) {
  New-Item -ItemType Directory -Path $resolvedDir -Force | Out-Null
}

# Load required assemblies
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Get clipboard image
$img = [System.Windows.Forms.Clipboard]::GetImage()
if ($null -eq $img) {
  Write-Error "剪贴板中没有图片。请先截图并复制到剪贴板（Ctrl+C / 截图工具 → 复制）"
  exit 1
}

# Save to file
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$filePath = Join-Path $resolvedDir "screenshot-$timestamp.png"
$img.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()

Write-Host "✅ 截图已保存: $filePath"
