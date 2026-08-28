#!/bin/bash
API_KEY="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"
BASE_URL="https://integrate.api.nvidia.com/v1"

MODELS=(
  "meta/llama-4-maverick-17b-128e-instruct"
  "meta/llama-3.3-70b-instruct"
  "meta/llama-3.1-70b-instruct"
  "meta/llama-3.1-8b-instruct"
  "nvidia/llama-3.1-nemotron-70b-instruct"
  "nvidia/llama-3.1-nemotron-ultra-253b-instruct"
  "nvidia/nemotron-4-340b-instruct"
  "nvidia/llama-3.1-nemotron-70b-instruct-hf"
  "nvidia/nemotron-mini-4b-instruct"
  "mistralai/mistral-large-3-675b-instruct-2512"
  "mistralai/mistral-small-24b-instruct-2501"
  "mistralai/mistral-nemo-12b-instruct"
  "mistralai/mixtral-8x22b-instruct-v0.1"
  "mistralai/mixtral-8x7b-instruct-v0.1"
  "deepseek-ai/deepseek-r1"
  "deepseek-ai/deepseek-v4-pro"
  "deepseek-ai/deepseek-v3"
  "qwen/qwen3-235b-a22b"
  "qwen/qwen2.5-72b-instruct"
  "qwen/qwen2.5-32b-instruct"
  "qwen/qwen2.5-7b-instruct"
  "qwen/qwq-32b"
  "google/gemma-3-27b-it"
  "google/gemma-3-12b-it"
  "google/gemma-3-4b-it"
  "google/gemma-3-1b-it"
  "moonshotai/kimi-vl-a3b-thinking"
  "minimax/minimax-m1-80b"
  "bytedance-research/ui-tars-72b-sft"
  "upstage/solar-10.7b-instruct"
  "stockmark/stockmark-35b"
  "abacusai/supermaven-v2.5-32k"
  "01-ai/yi-large"
  "sarvamai/sarvam-1"
  "stepfun-ai/step-3.5-flash"
  "stepfun-ai/step-3.7-flash"
)

echo "============================================="
echo "TESTANDO ${#MODELS[@]} MODELOS NA API NVIDIA NIM"
echo "============================================="
echo ""

OK_MODELS=()
FAIL_MODELS=()

for model in "${MODELS[@]}"; do
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${BASE_URL}/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${API_KEY}" \
    -d "{
      \"model\": \"${model}\",
      \"messages\": [{\"role\": \"user\", \"content\": \"Hi\"}],
      \"max_tokens\": 1,
      \"temperature\": 0,
      \"stream\": false
    }" \
    --connect-timeout 10 \
    --max-time 30)

  if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ $model -> HTTP $HTTP_CODE (OK)"
    OK_MODELS+=("$model")
  else
    echo "❌ $model -> HTTP $HTTP_CODE (FAIL)"
    FAIL_MODELS+=("$model")
  fi
done

echo ""
echo "============================================="
echo "RESUMO"
echo "============================================="
echo "✅ FUNCIONANDO (${#OK_MODELS[@]}):"
for m in "${OK_MODELS[@]}"; do echo "   $m"; done
echo ""
echo "❌ REMOVIDOS (${#FAIL_MODELS[@]}):"
for m in "${FAIL_MODELS[@]}"; do echo "   $m"; done
