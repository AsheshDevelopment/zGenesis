# Frozen beta content

Revision `beta-20261105-1`. Both C++ authority and BGFX UI compile the same
`_shared_cpp/beta/BetaContent.h`; `Content.json` is the exact readable inventory.
Unknown IDs are rejected rather than enabled implicitly. Native level/class,
weapon, item, target and resource requirements still apply. Enabled rule paths
are distinct from individual graphical acceptance.

Maps: Zone01 Mandara1st, Zone02 Mandara2nd, Zone03 MandaraCave, Zone04 MandaraCave2nd, Zone05 MandaraCave3rd.

Story flags: 0, 1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 31, 32, 33, 35. Flag0 is the original tutorial choice; flags1-5 are the tutorials,6 is the first class,11-21 the selected Mandara story progression,31/32/33/35 the implemented second-class rule paths. The unfinished quiz34 is excluded.
Task IDs: 10006, 10013, 10057.

Services:

- character creation/deletion and three-slot roster
- inventory/equipment/stack/split/pickup
- ordinary attacks, enabled skills, death/revival and recovery
- merchant buying/selling, repair and warehouse
- save points and ordinary portals within Zones01-05
- altar main/sub refining
- priest selection/offerings and source class promotions
- frozen story/task quests
- local/party/guild/whisper chat
- party, guild ranks/marks and atomic trade
- operator-granted cash delivery through local ledger

Unavailable:

- Zones06 onward and competitive admission
- PvP, duels, siege, guild alliances and event betting
- premium class reset and the unfinished second-class quiz (quest34)
- live billing/provider payments
- story/task IDs absent from this inventory

## Skill inventory

Available English names come from the original FX-PC resource catalog. Missing/invalid text is recorded as Skill plus its authoritative ID; no translation is invented.

| ID | Native name | Kind | Available | Reason |
| --- | --- | --- | --- | --- |
| 3001 | Skill 3001 | passive | Yes |  |
| 3002 | Skill 3002 | passive | Yes |  |
| 3003 | Skill 3003 | passive | Yes |  |
| 3004 | Skill 3004 | passive | Yes |  |
| 3005 | Skill 3005 | passive | Yes |  |
| 3006 | Skill 3006 | passive | Yes |  |
| 3007 | Skill 3007 | active | Yes |  |
| 3008 | Skill 3008 | passive | Yes |  |
| 3009 | Skill 3009 | active | Yes |  |
| 3010 | Skill 3010 | passive | Yes |  |
| 3011 | Skill 3011 | active | Yes |  |
| 3012 | Skill 3012 | active | Yes |  |
| 3013 | Skill 3013 | active | No | instant recipient world service |
| 3014 | Skill 3014 | active | Yes |  |
| 3015 | Skill 3015 | passive | Yes |  |
| 3016 | Skill 3016 | passive | Yes |  |
| 3017 | Skill 3017 | active | Yes |  |
| 3019 | Skill 3019 | active | Yes |  |
| 3021 | Skill 3021 | active | Yes |  |
| 3022 | Skill 3022 | active | Yes |  |
| 3023 | Skill 3023 | active | Yes |  |
| 3024 | Skill 3024 | passive | Yes |  |
| 3025 | Skill 3025 | active | Yes |  |
| 3026 | Skill 3026 | active | Yes |  |
| 3027 | Skill 3027 | active | Yes |  |
| 3028 | Skill 3028 | active | Yes |  |
| 3029 | Skill 3029 | active | No | instant recipient world service |
| 3030 | Skill 3030 | active | Yes |  |
| 3031 | Skill 3031 | active | Yes |  |
| 3032 | Skill 3032 | active | Yes |  |
| 3033 | Skill 3033 | active | Yes |  |
| 3041 | Skill 3041 | active | Yes |  |
| 3042 | Skill 3042 | active | Yes |  |
| 3043 | Skill 3043 | active | Yes |  |
| 3058 | Skill 3058 | active | Yes |  |
| 3059 | Skill 3059 | active | Yes |  |
| 3060 | Skill 3060 | passive | Yes |  |
| 3061 | Skill 3061 | active | Yes |  |
| 3066 | Skill 3066 | passive | Yes |  |
| 3067 | Skill 3067 | passive | Yes |  |
| 3068 | Skill 3068 | passive | Yes |  |
| 3069 | Skill 3069 | passive | Yes |  |
| 3070 | Skill 3070 | passive | Yes |  |
| 3071 | Skill 3071 | passive | Yes |  |
| 3072 | Skill 3072 | passive | Yes |  |
| 3073 | Skill 3073 | passive | Yes |  |
| 3074 | Skill 3074 | passive | Yes |  |
| 3075 | Skill 3075 | passive | Yes |  |
| 3076 | Skill 3076 | passive | Yes |  |
| 3077 | Skill 3077 | passive | Yes |  |
| 3096 | Skill 3096 | passive | Yes |  |
| 3097 | Skill 3097 | passive | Yes |  |
| 3098 | Skill 3098 | passive | Yes |  |
| 3099 | Skill 3099 | passive | Yes |  |
| 3101 | Skill 3101 | passive | Yes |  |
| 3102 | Skill 3102 | active | Yes |  |
| 3103 | Skill 3103 | active | Yes |  |
| 3104 | Skill 3104 | active | Yes |  |
| 3105 | Skill 3105 | passive | Yes |  |
| 3106 | Skill 3106 | passive | Yes |  |
| 3107 | Skill 3107 | active | Yes |  |
| 3108 | Skill 3108 | passive | Yes |  |
| 3109 | Skill 3109 | active | Yes |  |
| 3110 | Skill 3110 | active | Yes |  |
| 3111 | Skill 3111 | active | Yes |  |
| 3112 | Skill 3112 | active | Yes |  |
| 3113 | Skill 3113 | active | Yes |  |
| 3114 | Skill 3114 | active | Yes |  |
| 3115 | Skill 3115 | active | No | unfinished start action |
| 3116 | Skill 3116 | active | Yes |  |
| 3117 | Skill 3117 | active | Yes |  |
| 3118 | Skill 3118 | active | Yes |  |
| 3119 | Skill 3119 | active | Yes |  |
| 3121 | Skill 3121 | active | Yes |  |
| 3122 | Skill 3122 | active | Yes |  |
| 3124 | Skill 3124 | active | Yes |  |
| 3126 | Skill 3126 | active | Yes |  |
| 3127 | Skill 3127 | active | Yes |  |
| 3128 | Skill 3128 | active | Yes |  |
| 3129 | Skill 3129 | active | Yes |  |
| 3130 | Skill 3130 | active | Yes |  |
| 3131 | Skill 3131 | active | Yes |  |
| 3141 | Skill 3141 | active | Yes |  |
| 3142 | Skill 3142 | active | Yes |  |
| 3143 | Skill 3143 | active | Yes |  |
| 3144 | Skill 3144 | active | Yes |  |
| 3145 | Skill 3145 | active | No | authored attack binding absent |
| 3146 | Skill 3146 | active | No | authored attack binding absent |
| 3159 | Skill 3159 | active | Yes |  |
| 3160 | Skill 3160 | active | Yes |  |
| 3161 | Skill 3161 | active | Yes |  |
| 3162 | Skill 3162 | active | Yes |  |
| 3166 | Skill 3166 | passive | Yes |  |
| 3167 | Skill 3167 | passive | Yes |  |
| 3168 | Skill 3168 | passive | Yes |  |
| 3169 | Skill 3169 | passive | Yes |  |
| 3170 | Skill 3170 | passive | Yes |  |
| 3171 | Skill 3171 | passive | Yes |  |
| 3172 | Skill 3172 | passive | Yes |  |
| 3173 | Skill 3173 | passive | Yes |  |
| 3174 | Skill 3174 | passive | Yes |  |
| 3175 | Skill 3175 | passive | Yes |  |
| 3176 | Skill 3176 | passive | Yes |  |
| 3177 | Skill 3177 | passive | Yes |  |
| 3199 | Skill 3199 | passive | Yes |  |
| 3201 | Skill 3201 | passive | Yes |  |
| 3202 | Skill 3202 | active | Yes |  |
| 3203 | Skill 3203 | passive | Yes |  |
| 3204 | Skill 3204 | active | Yes |  |
| 3205 | Skill 3205 | passive | Yes |  |
| 3206 | Skill 3206 | active | Yes |  |
| 3207 | Skill 3207 | passive | Yes |  |
| 3208 | Skill 3208 | active | Yes |  |
| 3209 | Skill 3209 | active | Yes |  |
| 3210 | Skill 3210 | active | Yes |  |
| 3211 | Skill 3211 | active | Yes |  |
| 3212 | Skill 3212 | active | Yes |  |
| 3213 | Skill 3213 | active | No | instant recipient world service |
| 3214 | Skill 3214 | active | Yes |  |
| 3215 | Skill 3215 | active | Yes |  |
| 3217 | Skill 3217 | active | Yes |  |
| 3218 | Skill 3218 | active | Yes |  |
| 3219 | Skill 3219 | active | Yes |  |
| 3221 | Skill 3221 | active | Yes |  |
| 3222 | Skill 3222 | active | Yes |  |
| 3223 | Skill 3223 | active | Yes |  |
| 3224 | Skill 3224 | active | Yes |  |
| 3225 | Skill 3225 | active | Yes |  |
| 3226 | Skill 3226 | active | Yes |  |
| 3227 | Skill 3227 | active | Yes |  |
| 3228 | Skill 3228 | active | Yes |  |
| 3229 | Skill 3229 | active | Yes |  |
| 3230 | Skill 3230 | active | Yes |  |
| 3231 | Skill 3231 | active | Yes |  |
| 3241 | Skill 3241 | active | Yes |  |
| 3242 | Skill 3242 | active | Yes |  |
| 3243 | Skill 3243 | active | Yes |  |
| 3244 | Skill 3244 | active | Yes |  |
| 3245 | Skill 3245 | active | Yes |  |
| 3246 | Skill 3246 | active | Yes |  |
| 3247 | Skill 3247 | active | Yes |  |
| 3256 | Skill 3256 | passive | Yes |  |
| 3257 | Skill 3257 | active | Yes |  |
| 3258 | Skill 3258 | active | Yes |  |
| 3259 | Skill 3259 | active | Yes |  |
| 3260 | Skill 3260 | active | Yes |  |
| 3261 | Skill 3261 | active | Yes |  |
| 3262 | Skill 3262 | active | Yes |  |
| 3263 | Skill 3263 | active | No | instant recipient world service |
| 3264 | Skill 3264 | active | Yes |  |
| 3266 | Skill 3266 | passive | Yes |  |
| 3267 | Skill 3267 | passive | Yes |  |
| 3268 | Skill 3268 | passive | Yes |  |
| 3269 | Skill 3269 | passive | Yes |  |
| 3270 | Skill 3270 | passive | Yes |  |
| 3271 | Skill 3271 | passive | Yes |  |
| 3272 | Skill 3272 | passive | Yes |  |
| 3273 | Skill 3273 | passive | Yes |  |
| 3274 | Skill 3274 | passive | Yes |  |
| 3275 | Skill 3275 | passive | Yes |  |
| 3276 | Skill 3276 | passive | Yes |  |
| 3277 | Skill 3277 | passive | Yes |  |
| 3297 | Skill 3297 | passive | Yes |  |
| 3298 | Skill 3298 | passive | Yes |  |
| 3299 | Skill 3299 | passive | Yes |  |
| 3301 | Skill 3301 | active | Yes |  |
| 3302 | Skill 3302 | passive | Yes |  |
| 3303 | Skill 3303 | active | Yes |  |
| 3304 | Skill 3304 | active | Yes |  |
| 3305 | Skill 3305 | active | Yes |  |
| 3306 | Skill 3306 | active | Yes |  |
| 3307 | Skill 3307 | active | Yes |  |
| 3308 | Skill 3308 | active | Yes |  |
| 3309 | Skill 3309 | active | Yes |  |
| 3310 | Skill 3310 | passive | Yes |  |
| 3311 | Skill 3311 | passive | Yes |  |
| 3312 | Skill 3312 | active | Yes |  |
| 3313 | Skill 3313 | active | No | authored attack binding absent |
| 3314 | Skill 3314 | active | Yes |  |
| 3315 | Skill 3315 | active | Yes |  |
| 3316 | Skill 3316 | active | Yes |  |
| 3317 | Skill 3317 | active | Yes |  |
| 3318 | Skill 3318 | active | Yes |  |
| 3320 | Skill 3320 | active | Yes |  |
| 3321 | Skill 3321 | active | Yes |  |
| 3322 | Skill 3322 | active | Yes |  |
| 3323 | Skill 3323 | active | Yes |  |
| 3324 | Skill 3324 | active | Yes |  |
| 3325 | Skill 3325 | active | Yes |  |
| 3326 | Skill 3326 | active | Yes |  |
| 3327 | Skill 3327 | active | Yes |  |
| 3328 | Skill 3328 | active | Yes |  |
| 3329 | Skill 3329 | active | Yes |  |
| 3330 | Skill 3330 | active | Yes |  |
| 3331 | Skill 3331 | active | No | unfinished start action |
| 3332 | Skill 3332 | active | No | unfinished start action |
| 3333 | Skill 3333 | active | Yes |  |
| 3334 | Skill 3334 | active | Yes |  |
| 3335 | Skill 3335 | active | Yes |  |
| 3336 | Skill 3336 | passive | Yes |  |
| 3337 | Skill 3337 | active | No | instant recipient world service |
| 3338 | Skill 3338 | active | No | authored attack binding absent |
| 3341 | Skill 3341 | active | Yes |  |
| 3343 | Skill 3343 | active | Yes |  |
| 3357 | Skill 3357 | active | No | instant recipient world service |
| 3359 | Skill 3359 | active | Yes |  |
| 3360 | Skill 3360 | passive | Yes |  |
| 3361 | Skill 3361 | active | Yes |  |
| 3366 | Skill 3366 | passive | Yes |  |
| 3367 | Skill 3367 | passive | Yes |  |
| 3368 | Skill 3368 | passive | Yes |  |
| 3369 | Skill 3369 | passive | Yes |  |
| 3370 | Skill 3370 | passive | Yes |  |
| 3371 | Skill 3371 | passive | Yes |  |
| 3372 | Skill 3372 | passive | Yes |  |
| 3373 | Skill 3373 | passive | Yes |  |
| 3374 | Skill 3374 | passive | Yes |  |
| 3375 | Skill 3375 | passive | Yes |  |
| 3376 | Skill 3376 | passive | Yes |  |
| 3377 | Skill 3377 | passive | Yes |  |
| 3397 | Skill 3397 | passive | Yes |  |
| 3398 | Skill 3398 | passive | Yes |  |
| 3399 | Skill 3399 | passive | Yes |  |

Missing native generator3905, zero-position NPCs and earlier resource gaps remain recorded in the Zone05/four-zone guides. No HPK extraction or replacement assets. Offline development profiles remain separate from connected beta acceptance.
