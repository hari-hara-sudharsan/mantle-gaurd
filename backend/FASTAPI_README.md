# MantleGuard FastAPI Backend

This folder now includes the Python backend expected by the `apps/web` frontend.

## Run Locally

```powershell
cd C:\Users\Windows\regvault-ai\regvault-ai\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

Open:

```text
http://localhost:8000/docs
```

## Endpoints

- `POST /analyze`
- `POST /audit`
- `POST /chat`
- `POST /register-audit`

The contract endpoints accept JSON:

```json
{
  "contract": "pragma solidity ^0.8.0; contract Test { function mint() public {} }"
}
```

They also accept multipart upload with a `file` field.

## Real vs Local-Proof Mode

Gas profiling, audit detection, and copilot retrieval run locally with deterministic backend logic.

`/register-audit` behaves in two modes:

- `onchain`: if `PRIVATE_KEY`, `MANTLE_RPC_URL`, `AUDIT_LOGGER_ABI_JSON`, and `AUDIT_LOGGER_ADDRESS` are configured.
- `local-proof`: if on-chain config is missing. It still hashes the audit payload and returns a deterministic transaction-like proof so the frontend demo remains usable.

To make registration fully on-chain, add these to `backend/.env`:

```env
MANTLE_RPC_URL=https://rpc.sepolia.mantle.xyz
MANTLE_EXPLORER_URL=https://sepolia.mantlescan.xyz
AUDIT_LOGGER_ADDRESS=0xFc8cd61D26aF1A419B23F3bA08BE68aF3D9e827a
PRIVATE_KEY=your_mantle_sepolia_private_key
AUDIT_LOGGER_ABI_JSON=[{"type":"function","name":"logAudit","inputs":[{"name":"auditHash","type":"bytes32"}],"outputs":[],"stateMutability":"nonpayable"}]
AUDIT_LOGGER_FUNCTION=logAudit
```

If your deployed `AuditLogger.sol` uses a different function name or parameters, update `AUDIT_LOGGER_ABI_JSON` and `AUDIT_LOGGER_FUNCTION`.
