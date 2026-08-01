PS V:\PlayGenAI> npx ts-node src/RunFramework.ts
npm notice run playgenai@1.0.0 npx
npm notice run ts-node src/RunFramework.ts
========== PLANNER ==========
========== OPENAI ERROR ==========
APIConnectionError: Connection error.
    at OpenAI.makeRequest (V:\PlayGenAI\ai-core\node_modules\openai\src\client.ts:845:13)
    at processTicksAndRejections (node:internal/process/task_queues:104:5)
    at async OpenAIProvider.generate (V:\PlayGenAI\ai-core\src\provider\OpenAIProvider.ts:22:30)
    at async AICore.execute (V:\PlayGenAI\ai-core\src\services\aicore.ts:21:26)
    at async PlannerAgent.plan (V:\PlayGenAI\src\agents\planner\PlannerAgent.ts:22:28)
    at async main (V:\PlayGenAI\src\RunFramework.ts:22:27) {
  status: undefined,
  headers: undefined,
  requestID: undefined,
  error: undefined,
  code: undefined,
  param: undefined,
  type: undefined,
  cause: [TypeError: fetch failed] {
    [cause]: Error: read ECONNRESET
        at TLSWrap.onStreamRead (node:internal/stream_base_commons:216:20) {
      errno: -4077,
      code: 'ECONNRESET',
      syscall: 'read'
    }
  }
}
==================================
========== AI RESPONSE ==========
{
  success: false,
  provider: 'OPENAI',
  model: 'gpt-5.5',
  output: '',
  error: 'Connection error.'
}
=================================
{ valid: false, message: 'Connection error.' }
{ testPlan: '' }
========== GENERATOR ==========
========== OPENAI ERROR ==========
APIConnectionError: Connection error.
    at OpenAI.makeRequest (V:\PlayGenAI\ai-core\node_modules\openai\src\client.ts:845:13)
    at processTicksAndRejections (node:internal/process/task_queues:104:5)
    at async OpenAIProvider.generate (V:\PlayGenAI\ai-core\src\provider\OpenAIProvider.ts:22:30)
    at async AICore.execute (V:\PlayGenAI\ai-core\src\services\aicore.ts:21:26)
    at async GeneratorAgent.generate (V:\PlayGenAI\src\agents\generator\GeneratorAgent.ts:23:28)
    at async main (V:\PlayGenAI\src\RunFramework.ts:32:29) {
  status: undefined,
  headers: undefined,
  requestID: undefined,
  error: undefined,
  code: undefined,
  param: undefined,
  type: undefined,
  cause: [TypeError: fetch failed] {
    [cause]: Error: read ECONNRESET
        at TLSWrap.onStreamRead (node:internal/stream_base_commons:216:20) {
      errno: -4077,
      code: 'ECONNRESET',
      syscall: 'read'
    }
  }
}
==================================
========== AI RESPONSE ==========
{
  success: false,
  provider: 'OPENAI',
  model: 'gpt-5.5',
  output: '',
  error: 'Connection error.'
}
=================================
{ valid: false, message: 'Connection error.' }