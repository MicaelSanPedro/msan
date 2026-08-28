#!/usr/bin/env python3
"""Test which NIM models can read different file types."""
import base64
import json
import os
import urllib.request
import ssl

API_KEY = "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"

MODELS = [
    # Vision models (known to work with images)
    "nvidia/llama-4-maverick-17b-128e-instruct",
    "meta/llama-3.2-90b-vision-instruct",
    "nvidia/llama-3.2-nv-llama2-70b-instruct",
    "google/gemma-3-27b-it",
    "mistralai/pixtral-large-2507",
    # Text models
    "meta/llama-3.3-70b-instruct",
    "deepseek-ai/deepseek-r1",
    "mistralai/mixtral-8x22b-instruct-v0.1",
    "nvidia/nemotron-4-340b-instruct",
    "microsoft/phi-4",
    "qwen/qwen3-235b-a22b",
]

FILES = {
    "txt": ("/tmp/file-test/test.txt", "text/plain"),
    "html": ("/tmp/file-test/test.html", "text/html"),
    "py": ("/tmp/file-test/test.py", "text/x-python"),
    "pdf": ("/tmp/file-test/test.pdf", "application/pdf"),
    "pptx": ("/tmp/file-test/test.pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"),
}

ctx = ssl.create_default_context()

def test_text_content(model, file_type, file_path, mime):
    """Test 1: Send file content as plain text in the message."""
    try:
        with open(file_path, "r", errors="replace") as f:
            content = f.read()
        
        body = json.dumps({
            "model": model,
            "messages": [{
                "role": "user",
                "content": f"Analise este arquivo {file_type} e me diga o que contém em uma frase curta:\n\n```\n{content[:3000]}\n```"
            }],
            "max_tokens": 200,
            "temperature": 0.1,
        }).encode()

        req = urllib.request.Request(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            data=body,
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
            },
        )
        with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
            data = json.loads(resp.read())
            answer = data["choices"][0]["message"]["content"][:150]
            return True, answer
    except Exception as e:
        err = str(e)[:100]
        return False, err

def test_file_url(model, file_type, file_path, mime):
    """Test 2: Send file as file_url content type (if supported)."""
    try:
        with open(file_path, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        
        data_url = f"data:{mime};base64,{b64}"
        
        body = json.dumps({
            "model": model,
            "messages": [{
                "role": "user",
                "content": [
                    {"type": "text", "text": f"Analise este arquivo {file_type} e me diga o que contém em uma frase curta."},
                    {"type": "file_url", "file_url": {"url": data_url}}
                ]
            }],
            "max_tokens": 200,
            "temperature": 0.1,
        }).encode()

        req = urllib.request.Request(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            data=body,
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
            },
        )
        with urllib.request.urlopen(req, timeout=60, context=ctx) as resp:
            data = json.loads(resp.read())
            answer = data["choices"][0]["message"]["content"][:150]
            return True, answer
    except Exception as e:
        err = str(e)[:120]
        return False, err

# ---- Run tests ----
print("=" * 80)
print("TESTE 1: Conteúdo do arquivo como texto no prompt")
print("=" * 80)

for model in MODELS:
    print(f"\n🤖 {model}")
    for ftype, (fpath, mime) in FILES.items():
        ok, result = test_text_content(model, ftype, fpath, mime)
        status = "✅" if ok else "❌"
        if ok:
            print(f"  {status} {ftype}: {result}")
        else:
            print(f"  {status} {ftype}: {result}")

print("\n" + "=" * 80)
print("TESTE 2: Arquivo via file_url (conteúdo multimídia)")
print("=" * 80)

for model in MODELS:
    print(f"\n🤖 {model}")
    for ftype, (fpath, mime) in FILES.items():
        ok, result = test_file_url(model, ftype, fpath, mime)
        status = "✅" if ok else "❌"
        if ok:
            print(f"  {status} {ftype}: {result}")
        else:
            print(f"  {status} {ftype}: {result}")