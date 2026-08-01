PS V:\PlayGenAI> npx ts-node src/RunFramework.ts               
npm notice run playgenai@1.0.0 npx
npm notice run ts-node src/RunFramework.ts
========== PLANNER ==========
{ valid: false, message: 'Connection error.' }
{ testPlan: '' }
========== GENERATOR ==========
Error: ENOENT: no such file or directory, open 'V:\PlayGenAI\ai-core\src\templates\generator.md'
    at Object.readFileSync (node:fs:441:20)
    at PromptEngine.build (V:\PlayGenAI\ai-core\src\services\PromptEngine.ts:15:27)
    at AICore.execute (V:\PlayGenAI\ai-core\src\services\aicore.ts:14:47)
    at GeneratorAgent.generate (V:\PlayGenAI\src\agents\generator\GeneratorAgent.ts:23:46)
    at main (V:\PlayGenAI\src\RunFramework.ts:32:45)
    at processTicksAndRejections (node:internal/process/task_queues:104:5) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'V:\\PlayGenAI\\ai-core\\src\\templates\\generator.md'
}