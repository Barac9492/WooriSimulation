# 방법론과 진단 분석 — 인용 가능한 학술 근거 (METHODOLOGY)

이 문서는 시뮬레이터의 **방법(엔진)**과 **진단 분석**이 기대고 있는 학술 문헌을 정리한 것이다. 목적은 둘이다. (1) 각 설계 선택이 임의가 아니라 검증된 방법 전통 위에 있음을 밝히고, (2) 인용이 필요할 때 바로 쓰도록 원전·DOI를 모은다.

**전제(반드시 유지):** 이 도구는 현실을 맞히는 예측기가 아니다. 계수는 가정값이며, 결과는 "이 전제대로면 이렇게 흐른다"는 방향이다. 이 겸손의 학술적 근거가 Box(1976) "모든 모형은 틀렸다, 다만 일부가 쓸모 있다"와 Bruch & Atwell(2015)의 ABM 해석 지침이다.

플래그: **[SEMINAL]** 정초/표준 · **[APPLIED]** 적용 · **[MEASURED]** 실증 데이터 · **[THEORY/FRAMEWORK]** 개념·방법 · **[CONTESTED]** 논쟁 중.

---

## 1. 엔진 구조 — 행위자 기반 모형(ABM) + 시스템 다이내믹스

학생 한 명이 행위자, 주 단위 `tick`, 집계는 부서 지표. 헤드리스 what-if로 계획을 견준다.

- **Epstein, J. M. (1999/2006).** *Generative Social Science.* "안 키워 봤으면 설명한 게 아니다(generative)." 거시 패턴(잔존·졸업 신앙 잔존)은 미시 규칙에서 *창발*해야 한다. [SEMINAL] *Complexity* 4(5):41–60 / Princeton UP.
- **Bonabeau, E. (2002).** Agent-based modeling. *PNAS* 99(suppl 3):7280–7287. https://doi.org/10.1073/pnas.082080899 — 이질적 행위자·국소 상호작용·창발일 때 ABM이 옳은 도구. [SEMINAL]
- **Grimm, V., et al. (2006; 2010).** ODD 프로토콜. *Ecological Modelling* 198:115–126 (https://doi.org/10.1016/j.ecolmodel.2006.04.023); 221:2760–2768 (https://doi.org/10.1016/j.ecolmodel.2010.08.019) — 상태변수·스케줄·서브모델을 재현 가능하게 기술(이 저장소의 CLAUDE.md/ONTOLOGY.md 구조와 대응). [SEMINAL]
- **Bruch, E., & Atwell, J. (2015).** Agent-based models in empirical social research. *Sociological Methods & Research* 44(2):186–221. https://doi.org/10.1177/0049124113506405 — 보정·민감도 분석, 매개변수 과신 경계("그냥 넣어 본 값"의 근거). [APPLIED]
- **Box, G. E. P. (1976).** Science and statistics. *JASA* 71(356):791–799. https://doi.org/10.1080/01621459.1976.10480949 — "모든 모형은 틀렸다." [SEMINAL]
- **Forrester, J. W. (1961).** *Industrial Dynamics.* MIT Press — 스톡·플로·피드백의 what-if(2층 출석 `commit`→`eng`). [SEMINAL/BOOK]
- **Orcutt, G. H. (1957).** A new type of socio-economic system. *Review of Economics and Statistics* 39(2):116–123. https://doi.org/10.2307/1928528 — 미시모사(개체 시뮬→집계)의 시조. [SEMINAL]
- **종교 ABM:** Iannaccone, L. R. (1992) Sacrifice and stigma. *JPE* 100(2):271–291 (https://doi.org/10.1086/261818) [SEMINAL]; Hayward, J. (1999) Mathematical modeling of church growth. *J. Math. Sociology* 23(4):255–292 — 신앙 전파를 전염병식으로(교회 성장·쇠퇴) [APPLIED]; Power et al. (2025) 세속화 ABM. *PLOS ONE*. https://doi.org/10.1371/journal.pone.0327674 [APPLIED].
- **교육 잔존 ABM(유사 사례):** 고등교육 잔존 ABM, Springer Adv. in Social Simulation (2024) https://doi.org/10.1007/978-3-031-89692-7_2 — 행위자=학생, 또래망+환경이 잔존을 가름. [APPLIED]

## 2. 창발·임계·캐스케이드 (전환 절벽이 손값이 아니라 창발)

- **Schelling, T. C. (1971).** Dynamic models of segregation. *J. Math. Sociology* 1(2):143–186. https://doi.org/10.1080/0022250X.1971.9989794 — 작은 개인 성향이 큰 거시 임계(티핑)로. `cliffProb`가 취약도에서 창발하는 근거. [SEMINAL]
- **Granovetter, M. (1978).** Threshold models of collective behavior. *AJS* 83(6):1420–1443. https://doi.org/10.1086/226707 — 임계 비율 넘으면 함께 넘어감(친구 캐스케이드 `lf>0.5`). [SEMINAL]
- **Watts, D. J. (2002).** A simple model of global cascades. *PNAS* 99(9):5766–5771. https://doi.org/10.1073/pnas.082090499 — 작은 충격이 전역 캐스케이드로(이탈의 비선형 가속). [SEMINAL]
- **Axelrod (1997)** Dissemination of culture, *JCR* 41(2):203–226 (https://doi.org/10.1177/0022002797041002001); **Deffuant et al. (2000)** Mixing beliefs, *Adv. Complex Syst.* 3:87–98 (https://doi.org/10.1142/S0219525900000078); **Hegselmann & Krause (2002)** Opinion dynamics, *JASSS* 5(3) — 믿음이 친구망 따라 *느리게*(주 단위 동기 갱신) 이동(`0.11*(pull-0.5)`). [SEMINAL]

## 3. 사회적 전염·네트워크 확산 (COVID 렌즈) — 반론 포함

- **전염 주장:** Christakis & Fowler — 비만 *NEJM* 357:370–379 (2007, https://doi.org/10.1056/NEJMsa066082); 흡연 *NEJM* 358:2249–2258 (2008); 행복 *BMJ* 337:a2338 (2008). 한 아이가 흔들리면 친구도. [SEMINAL][CONTESTED]
- **반론(정직성 근거):** Cohen-Cole & Fletcher (2008) *BMJ* 337:a2533 (여드름·키도 "전염"으로 나옴 → 동종선호 혼입); Lyons, R. (2011) *Statistics, Politics, and Policy* 2(1), https://doi.org/10.2202/2151-7509.1024 — 전염을 통계적으로 분리 못 함. "예측 아님/방향만"의 근거. [CRITIQUE]
- **복합전염:** Centola & Macy (2007) *AJS* 113:702–734 (https://doi.org/10.1086/521848); Centola (2010) *Science* 329:1194–1197 — 행동·신념은 *여러* 친구의 보강이 있어야 번짐(비율 규칙의 근거). [SEMINAL]
- **SIR/소문:** Kermack & McKendrick (1927) *Proc. R. Soc. A* 115:700–721 (SIR·R₀); Daley & Kendall (1964/65) 소문에 SIR 적용; Pastor-Satorras & Vespignani (2001) *PRL* 86:3200 (허브가 임계 낮춤). 든든/느슨/흔들림 + 번짐세 Rₜ의 근거. [SEMINAL]
- **청소년 신앙 또래효과:** Cheadle & Schwadel (2012) *Social Science Research* 41(5):1198–1212. https://doi.org/10.1016/j.ssresearch.2012.03.014 — 또래가 신앙을 *실제로* 움직임(영향+선택 둘 다). Veenstra et al. (2018) *Adolescent Research Review* 3:1–17 — 선택 vs 영향 분리(영향은 실재하나 작음). [APPLIED][CONTESTED]
- **슈퍼전파·표적 개입("먼저 붙들 아이"):** Kitsak et al. (2010) *Nature Physics* 6:888–893 (https://doi.org/10.1038/nphys1746, k-shell 영향력자=`spreadScore`); Cohen et al. (2003) *PRL* 91:247901 (지인 면역=핵 우선 돌봄); Kempe, Kleinberg & Tardos (2003) *KDD* 137–146 (영향 최대화 시딩=거점). [SEMINAL]

## 4. 신앙 측정 — 진단 입력의 척도 근거

- **내재/외재(출석 vs 내면화):** Allport & Ross (1967) *JPSP* 5(4):432–443 (https://doi.org/10.1037/h0021212, ROS); Gorsuch & McPherson (1989) *JSSR* 28(3):348–354 (I/E-R); Donahue (1985) *JPSP* 48(2):400–419 (메타: 내재는 헌신과, 외재는 아님). `eng` vs `owned`·`fragility`. [MEASURED]
- **SDT 내면화(`owned`):** Ryan, Rigby & King (1993) *JPSP* 65(3):586–596. https://doi.org/10.1037/0022-3514.65.3.586 (CRIS: 내사 vs 동일시); **Hardy, Nelson, Frandsen, Cazzell & Goodman (2022)** *Int. J. Psych. of Religion* 32(1):39–57 (https://doi.org/10.1080/10508619.2020.1844968, RIS-12, 청소년 N=2,982). [MEASURED]
- **신앙 성숙(갈래):** Benson, Donahue & Erickson (1993) Faith Maturity Scale. *Research in the Social Scientific Study of Religion* 5:1–26 (수직/수평 → `word`/`holy`/`belong`). [MEASURED]
- **헌신(`commit`):** Worthington et al. (2003) *J. Counseling Psychology* 50(1):84–96 (https://doi.org/10.1037/0022-0167.50.1.84, RCI-10); **청소년판은 Miller, Shepperd & McCullough (2013)** *Psychology of Religion and Spirituality* 5(4):242–251 (https://doi.org/10.1037/a0033641, RCI-A — Worthington 아님). [MEASURED]
- **신앙 강도(`faith`):** Plante & Boccaccini (1997) *Pastoral Psychology* 45(5):375–387. https://doi.org/10.1007/BF02230993 (SCSORF). [MEASURED]
- **신앙 단계(`faithStage`):** Fowler (1981) *Stages of Faith* (Harper & Row) [THEORY]; **비판** Streib (2001) *IJPR* 11(3):143–158 (https://doi.org/10.1207/S15327582IJPR1103_02 — 엄격한 선형/비가역 단계는 실증 안 됨 → 부드러운 렌즈로만). [CONTESTED]

## 5. 내면화·전수·의심 — 동역학 메커니즘 근거

- **부모 전수는 곱(온기×신앙):** **Stearns & McKinney (2020)** *Review of Religious Research* 62(1):153–171. https://doi.org/10.1007/s13644-020-00404-3 — 부모 신앙→자녀 신앙에 온기가 관여한다. **주의(§8): 이 논문은 온기를 *매개*로, *성별*을 조절자로 모형화한다("온기=조절자"의 발표된 상호작용 계수는 아님).** 곱 형태 `famT2=(fam-0.5)*(0.4+1.2*warmth)`는 Bengtson(아버지 온기)·Smith의 *방향*에 부합하는 **가설적 상호작용**이며 측정된 상호작용 계수가 아니다. [MODERATE→THEORY] / Bengtson (2013) *Families and Faith* (OUP, 35년 종단, 아버지 온기); Smith & Adamczyk (2021) *Handing Down the Faith* (OUP, 권위적=온기+대화 양육). [CONCEPTUAL]
- **의심 U자(`doubt`×`doubtSpace`):** Krause & Ellison (2009) *JSSR* 48(2):293–312. https://doi.org/10.1111/j.1468-5906.2009.01448.x — 의심의 해는 *말할 공간·지지*가 있으면 완충됨(processed vs festering). 단 표본이 노년이라, 청소년 U자는 Fuller Youth Institute(Sticky Faith) 자료로 보강 필요. [MEASURED, 한계 있음]
- **습관 불연속(전환기에 출석이 무너지는 기제):** Wood & Neal (2007) *Psychological Review* 114(4):843–863. https://doi.org/10.1037/0033-295X.114.4.843 — 습관은 맥락 단서가 끊기면 무너지나 신념(목표)은 남음. `fragility=eng-owned`의 기제. [SEMINAL]

## 6. 생존분석·코호트 이탈 — 전환 절벽·잔존 곡선

- **방법:** Cox (1972) 비례위험. *JRSS-B* 34(2):187–220 (https://doi.org/10.1111/j.2517-6161.1972.tb00899.x — 공변량이 위험률을 조절 = `cliffProb`); Kaplan & Meier (1958) *JASA* 53:457–481 (검열 고려 생존곡선 = 잔존 곡선; 졸업=검열, 이탈=손실); **Singer & Willett (1993)** *J. Educational Statistics* 18(2):155–195 (https://doi.org/10.2307/1165085 — *이산시간* 위험: 주 단위 tick마다 이탈 위험, 절벽=특정 시기 위험 급등 = 엔진과 가장 근접); Allison (2014) *Event History and Survival Analysis* (SAGE). [SEMINAL/METHODS]
- **학생 이탈 이론(버팀목):** Tinto (1975) *Review of Educational Research* 45(1):89–125 (https://doi.org/10.3102/00346543045001089 — 사회적 통합이 잔존; 외톨이 위험 = `sup`/친구효과); Bean & Metzner (1985) *RER* 55(4):485–540 (외부 환경 주도 = 3층 생태계·시험/수능). [SEMINAL/THEORY]
- **종교 이탈 타이밍:** **Uecker, Regnerus & Vaaler (2007)** Losing my religion. *Social Forces* 85(4):1667–1692 (https://doi.org/10.1353/sof.2007.0083 — *참여(출석)는 무너져도 신념은 남음*: `eng` vs `owned` 분리의 실증 앵커); Smith & Snell (2009) *Souls in Transition* (OUP); Pew (2009) *Faith in Flux*(대부분 24세 이전 이탈 → 절벽 시기); Kinnaman & Matlock (2019) *Faith for Exiles* / Barna(졸업 후 ~10%만 "회복력 제자" = 북극성 `carry`). [MEASURED; Barna는 회색문헌] **주의(§8): Lifeway "66% 이탈"은 *일시* 중단(대부분 복귀)이고 영속 disaffiliation은 약 20~22%(Pew 2025·Barna prodigal)다 — `carry`(영속 신앙 잔존)는 후자에 매핑한다. 실제 최대 손실은 졸업 직후 대학·청년부로, 중고등부 모형 창 밖이다.**
- **발달적 이유:** Arnett (2000) Emerging adulthood. *American Psychologist* 55(5):469–480. https://doi.org/10.1037/0003-066X.55.5.469 — 18~25세 역할·맥락의 단절 = 절벽 창. [SEMINAL]
- **한국 다음세대:** 목회데이터연구소 주간리포트 296호(교회 이탈 청년, 미혼 500명: 이탈까지 평균 2.1년·1년 내 57%) — 전환 절벽 타이밍·골든타임의 직접 보정원(회색문헌, 단면조사, 방향으로만). KCI 논문(ART002732116, ARCC 2021 n=1,017)도 있음(저자·권호 수기 확인 필요).

## 7. 조기경보·진단 지표 — 선행지표·지표 함정·불확실성

- **이탈 조기경보(선행 행동지표):** Balfanz, Herzog & Mac Iver (2007) *Educational Psychologist* 42(4):223–235 (https://doi.org/10.1080/00461520701621079 — ABC 지표 = `earlyWarn`·숨은 위험); Bowers, Sprott & Taff (2013) *The High School Journal* 96(2):77–100 (110개 플래그 ROC — 정확도 한계·정직성); Allensworth & Easton (2007) Chicago on-track(전환학년 상태 플래그 = 전환 절벽). [MEASURED]
- **임상 조기경보(휴리스틱 점수의 정직한 한계):** Royal College of Physicians (2017) NEWS2; Smith et al. (2013) *Resuscitation* 84(4):465–470 (AUROC로 검증, 예측 단정 아님); Sendelbach & Funk (2013) *AACN Adv. Crit. Care* 24(4):378–386 (경보 72~99% 거짓→알람 피로: 명단 짧게·신호등 보정). [MEASURED]
- **지표 함정(Goodhart 가드 — 출석을 목표로 걸지 말 것):** Goodhart (1975); Strathern (1997) *European Review* 5(3):305–321 ("측정이 목표가 되면 좋은 측정이기를 멈춘다"); Campbell (1979) *Evaluation and Program Planning* 2(1):67–90; Muller (2018) *The Tyranny of Metrics*; Kaplan & Norton (1992) *HBR*(선행/후행 균형). 출석 대신 내면화·졸업 잔존을 북극성으로. [SEMINAL/FRAMEWORK]
- **불확실성 전달:** Hullman, Resnick & Adar (2015) *PLOS ONE* 10(11):e0142444 (https://doi.org/10.1371/journal.pone.0142444 — 샘플 궤적(HOPs)이 오차막대보다 비전문가에게 정확: 전망 밴드·궤적의 근거); Spiegelhalter, Pearson & Short (2011) *Science* 333:1393–1400. [MEASURED]
- **복합지표 구성:** Nardo et al. / OECD (2008) *Handbook on Constructing Composite Indicators.* https://doi.org/10.1787/9789264043466-en — 정규화·가중·집계·민감도를 투명하게(조기경보 지수 합성). [FRAMEWORK]

---

## 8. 증거 등급화: 무엇이 얼마나 받쳐지나 (2026 적대적 리서치 패스)

다섯 갈래 병렬 리서치(검색 → 원전 fetch → 반대 검증 → 종합)로 핵심 구성요소를 다시 등급화했다. 한 줄 결론: **문헌은 모형의 구조와 부호(방향)를 받친다. 크기(계수)는 여전히 보정되지 않은 가정값이다.** 강도: 강(동료심사·전국조사) · 중(연구기관·소표본·단면) · 약/회색(사역기관 휴리스틱·추정).

| 구성요소 | 받쳐지는 것(방향) | 핵심 출처 | 강도 | 계수가 못 받치는 것 / 정정 |
|---|---|---|---|---|
| `eng` vs `owned` 분리 | 출석은 신앙을 과대표시, 내면화가 따로 움직임 | Smith·Denton(MTD); Allport·Ross; Hardy 2022(SDT); Uecker 2007(전환기엔 참여만 무너짐); 한국 목데연(만족 81%인데 이탈의향 34%) | 강(다중 독립) | 분리의 정확한 비율은 가정. 모형에서 가장 잘 받쳐진 설계. |
| `owned`→`carry` | 내면화된 십대 신앙이 성인 신앙을 가장 잘 예측 | Smith·Snell 2009(NSYR 종단) | 강 | 0.10+0.95·owned의 0.95 기울기는 미측정. |
| `carry` 크기(북극성) | 깊은 헌신 청년 10~15%, 영속 이탈 약 20~22% | Barna(회색) 10%; Smith 15%; Pew 2025(원종교 이탈 약 20%) | 중·혼합 | **정정: Lifeway "66% 이탈"은 *일시* 중단(대부분 복귀)이다. 영속 손실(`carry`)에 0.66을 쓰면 과대. 0.10 절편은 다소 후할 수 있다.** |
| 전환 절벽 `cliffProb` | 이탈은 청소년·초기성인에 집중(85%가 30세 전, 절반이 18세 전) | Pew 2025; Lifeway; Smith·Snell("절벽은 과장, 점진적") | 강(방향)·약(크기) | **정정: 대학 진학은 신앙을 *가속 이탈시키지 않는다*(Uecker 2007: 비진학자가 더 빠짐). 절벽은 완만하게·출석층 위주로. 실제 최대 손실은 모형 창(중고등부) *밖* 졸업 후(대학·청년부)다.** |
| 부모 전수 `fam` | 부모가 단일 최강 영향 | Bengtson 2013(35년 종단); Smith 2021; Pew 2020(소속 80% 일치) | 강 | 내면화는 *새는* 전수(소속 일치 80% vs "매우 중요"는 십대 24%·부모 43%). `fam`→`eng`(강)과 `fam`→`owned`(약)을 나눌 여지. |
| 온기×신앙 곱 `famT2` | 따뜻한 집은 잘 전수, 차가운 열심은 반항아 | Bengtson 2013(질적, 특히 아버지 온기); Smith 2021 | **약(가설적 상호작용)** | **정정: 깔끔한 정량 논문(Stearns·McKinney 2020)은 온기를 *매개*로, *성별*을 조절자로 본다. "온기=조절자"의 발표된 상호작용 계수는 확인 못 함. 곱 형태는 Bengtson 방향에 부합하는 가설이지 측정된 상호작용이 아니다.** |
| 의심 `doubt`×`doubtSpace` | 억압된 의심은 부식, 처리된 의심은 성장 재료 | Krause·Wulff 2004; Krause 2009; Galek 2007(동료심사 종단) | 강 | 표본이 18세+ → 청소년은 외삽. 단 피해가 젊을수록 커서 `festering` 가중은 정당. |
| 또래 친구당김 | 친구 신앙이 양방향으로 옮음(영향 실재) | Cheadle·Schwadel 2012; Hardy 2022(양방향); 인도네시아 복제 2022 | 강(방향) | 유사성의 일부는 *선택*(동종선호)이라 인과 계수는 상관의 일부여야 한다(0.11 적정). **티핑·캐스케이드 문턱(0.5/0.6)은 순수 가정, 보정 없음.** |
| 멘토·곁의 어른 `adults` | 자연 멘토 효과는 실재하나 *작고*, 질이 배수 | Van Dam 2018 메타분석(r≈.11); Search Institute | 강(작은 효과) | **5:1은 사역 휴리스틱(측정된 용량 아님). 실측에 가까운 문턱은 "어른 3명 이상"(Search Institute). 포화 곡선이 맞고 5에 계단은 아니다.** |
| 교사 `teacherEff` 1:6 | 과부하는 효율을 떨군다(문턱+수확체감) | 실무 norm 약 1:5; STAR 학급규모(유추) | 약(관습·유추) | 학급규모 실측 문턱은 약 13~17명(6 아님). 6%·0.2 곡선은 발명값. |
| 한국 쇠퇴 분해 | 쇠퇴의 약 절반이 교회 특이적(나머지는 인구) | 예장통합 교세통계; 목데연(교회학교 -37~43%/10년 vs 학령인구 -19% = 약 2배; 초등 -40% vs -4~7%) | 강(센서스)·중(분해) | **모형은 저출산 드리프트를 *외생*으로 둬야(상벌 대상 아님) 잔여만 레버가 움직이게. churchClimate 천장도 하락 추세(6개 교단 10년 연속 감소).** |
| 활동량 레버(수련회·행사) | *참여 자체*는 후일 신앙을 예측 못 함 | Smith·Snell 2009(NSYR) | 강(반증) | 모형이 행사를 `commit`/`owned`에 *느리게* 태우는 설계가 옳음. 행사가 `carry`에 직접 큰 효과를 내면 최선의 증거와 모순. |

**리서치가 드러낸 모형 개선 후보(계수 변경은 별도 결정, 지금은 문서화만):**

1. `carry`는 *영속* 이탈(약 20%)에 매핑하고 *일시* 중단과 구분한다(엔진은 `dropped`/`gradLapse`로 이미 분리, 크기만 점검).
2. `LEAVE_AFTER=12주`(약 3개월)는 실측 "골든타임" 약 2.1년(목데연 296호)보다 훨씬 빠르다. 실제 이탈에는 다년 활주로가 있다(`earlyWarn`의 근거가 오히려 강해진다).
3. 실제 최대 손실(대학·청년부)은 중고등부 창 *밖*이다. 잔존을 졸업 후로 한 칸 더 보는 확장이 정직하다.
4. 인구통계(저출산)는 외생 드리프트로 고정하고 사역 레버는 잔여만 움직이게 한다.
5. 친구당김 계수는 관측 상관의 *일부*(선택 제외)로 둔다.
6. 분당우리 약 150명 부는 전국 분포의 상위 이상치다(중앙값 교회학교 약 27명, 43%는 아예 없음). 계수는 건강한 대형교회를 기술하며 중앙값 교회가 아니다.

**2026 패스에서 추가·확인한 출처:** Pew Research Center (2025) *Religious Landscape Study* / religious switching (개신교 정체성 잔존 약 70%, 무종교 유출입 5.9:1); Pew (2025) Why people leave religion (이탈의 85%가 30세 전, 절반이 18세 전); Van Dam et al. (2018) Does natural mentoring matter? 메타분석(30개 연구), *Am. J. Community Psychology* 62:203–220, https://doi.org/10.1002/ajcp.12248 (r≈.106·d≈.21, 질이 배수); Krause & Wulff (2004) Religious doubt and health, *Sociology of Religion* 65(1):35–56; Galek, Krause, Ellison et al. (2007) Religious doubt and mental health across the lifespan, *J. Adult Development* 14:16–25, https://doi.org/10.1007/s10804-007-9027-2; Cheadle & Schwadel (2012, 본문 §3); Search Institute Developmental Relationships/Assets(어른 3명 이상); 예장통합 교세통계 · 목회데이터연구소 「넘버즈」(교회학교 학생수 추이, 84·143·214·296호). 다수 원전이 403/페이월이라 2차 보도 경유 확인했으니 정식 인용 전 원전 대조를 권한다.

---

## 엔진 ↔ 근거 한눈 매핑

| 엔진 요소 | 핵심 근거 |
|---|---|
| 행위자=학생, 주 tick, 헤드리스 what-if | Epstein 1999; Bonabeau 2002; Hegselmann-Krause 2002; Forrester 1961; Orcutt 1957 |
| 창발 절벽·캐스케이드 | Schelling 1971; Granovetter 1978; Watts 2002 |
| 친구 효과(느린 전파) | Deffuant 2000; Axelrod 1997; Centola & Macy 2007 |
| 전염 렌즈(SIR·Rₜ) | Kermack-McKendrick 1927; Daley-Kendall 1965; Pastor-Satorras 2001 — 반론 Lyons 2011, Cohen-Cole 2008 |
| `spreadScore`·먼저 붙들 아이 | Kitsak 2010; Cohen 2003; Kempe 2003 |
| `owned`/내면화 | Ryan·Rigby·King 1993; Hardy 2022; Allport-Ross 1967; Donahue 1985 |
| `commit`/`faith`/갈래 | Worthington 2003·Miller 2013; Plante 1997; Benson 1993 |
| `warmth×fam`(곱) | Stearns-McKinney 2020; Bengtson 2013; Smith-Adamczyk 2021 |
| `doubt`/`doubtSpace` | Krause-Ellison 2009 (+ FYI 보강) |
| `faithStage` | Fowler 1981 (+ Streib 2001 비판) |
| `cliffProb`(위험률) | Cox 1972; Singer-Willett 1993; Tinto 1975; Uecker 2007; Arnett 2000 |
| 졸업 신앙 잔존(`carry`) | Uecker 2007; Smith-Snell 2009; Barna/Kinnaman 2019 |
| 잔존 곡선 | Kaplan-Meier 1958; Allison 2014 |
| `fragility`(출석≠신념) | Wood-Neal 2007; Uecker 2007 |
| `earlyWarn`·숨은 위험 | Balfanz 2007; Bowers 2013; OECD 2008 |
| 신호등 정직성·명단 짧게 | Smith 2013(AUROC); Sendelbach 2013(알람 피로) |
| 출석을 목표로 안 함 | Goodhart 1975; Strathern 1997; Campbell 1979; Kaplan-Norton 1992 |
| 전망 밴드/샘플 궤적 | Hullman 2015; Spiegelhalter 2011 |

## 정직성·한계 (반드시 유지)

1. **계수는 가정값이다.** 위 문헌은 *방법과 방향*을 줄 뿐, 한국 중고등부 데이터로 보정된 한 주 단위 크기를 주지 않는다(Box 1976; Bruch & Atwell 2015).
2. **전염은 논쟁 중이다.** Christakis-Fowler 류 결과는 동종선호·공유환경과 분리하기 어렵다는 비판(Lyons 2011; Cohen-Cole 2008; Veenstra 2018)이 있다 — 그래서 "예측 아님".
3. **척도는 시작 상태 측정용**이지 동역학 계수 검증용이 아니다. 신앙 단계는 부드러운 렌즈(Streib 2001).
4. **회색문헌 구분:** Barna, 목회데이터연구소는 산업/설문 자료(비동료심사)다 — 방향으로만.
5. **검증 메모:** 대부분 DOI는 발행처/색인으로 확인했으나, 한국 KCI 논문(ART002732116)의 저자·권호와 일부 단행본 페이지는 정식 인용 전 수기 확인을 권한다.
6. **`carry`는 영속 손실에 매핑한다.** "이탈"은 세 가지가 섞여 있다: 일시 출석 중단(Lifeway 66%, 대부분 복귀)·미등록 그리스도인(Barna nomad 약 30%)·영속 disaffiliation(약 20~22%). 북극성 `carry`는 셋째에 해당한다(§8).
7. **온기 곱(`famT2`)은 측정된 상호작용이 아니라 가설이다.** 깔끔한 정량 연구는 온기를 매개·성별을 조절자로 본다(Stearns·McKinney 2020). 곱 형태는 Bengtson의 *방향*에 부합하는 모델링 선택이다 — "가정값, 방향으로만" 규칙을 그대로 유지한다(§8).
8. **저출산은 외생 교란이다.** 한국 교회학교 쇠퇴의 약 절반(어린 연령은 대부분)만 교회 특이적이고 나머지는 인구통계다(목데연·예장통합). 모형은 인구 드리프트를 상벌 대상으로 삼지 말아야 한다 — 사역 레버는 잔여만 움직인다(§8).
9. **모형 창 밖 손실·시간 척도.** 실제 최대 이탈은 졸업 후(대학·군대·청년부)로 중고등부 창 밖이고, 실측 이탈 활주로(약 2.1년)는 `LEAVE_AFTER=12주`보다 훨씬 길다. 잔존 수치는 보수적으로 읽는다(§8).
