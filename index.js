// ==================== 游戏状态 ====================
        let targetChar = '';
        let guessCount = 0;
        let gameWon = false;
        let targetPaths = [];
        let targetNestingLevels = [];
        let currentFont = null;
        let guessHistory = []; // 存储最近15次猜测
        let hintTextShown = false;
        let hintTextType = '';
        let hintMeaningValue = '';
        let revealedHintIndices = [];
        let hintCount = 0;
        let autoGuessTimer = null;
        let isShowingResult = false; // 是否在显示结果（继续状态）
        let countdownTimer = null; // 倒计时计时器
        let countdownValue = 3; // 倒计时值
        let currentDetailData = null; // 当前详情面板显示的数据

        // 常用汉字列表
        const commonChars = '的一了在人他这个们为国地到以时要就会可你对能得着过后作道行然家方多经么去法学如同现没动起分还进好小部些主理心她前但因只从想实日军意力它把机公使情明性全三点外将高间问很战向头体相见被利什二等产或新制加斯月话合回特代信给位次度门任常海通教儿提立员解真论义几口认条平气题活尔别打变神总何数安少结受量感务做接场件计管期德资命金指许统区保至队形社便空决治展马科司基眼非则听却达光放强即权思完设式路记南品住告类据程北边张该交规拉格望觉领共确传师观清今切院让识京口水沝淼㵘火炎焱燚炏池沙彩财富逗雨姐笑是处呢收资金您悠远圆园难鸡鸣';

        const charHints = {
                    "的": {
                                "pinyin": "de/di2/di4",
                                "meaning": "(possessive particle)/of, really and truly, aim/clear"
                    },
                    "一": {
                                "pinyin": "yi1",
                                "meaning": "one/1/single/a(n)"
                    },
                    "了": {
                                "pinyin": "le/liao3/liao4",
                                "meaning": "(modal particle intensifying preceding clause)/(completed action marker), to know/to understand/to know, clear, look afar from a high place"
                    },
                    "在": {
                                "pinyin": "zai4",
                                "meaning": "(located) at/in/exist"
                    },
                    "人": {
                                "pinyin": "ren2",
                                "meaning": "man/person/people"
                    },
                    "他": {
                                "pinyin": "ta1",
                                "meaning": "he/him"
                    },
                    "这": {
                                "pinyin": "zhe4/zhei4",
                                "meaning": "this/these, this/these/(sometimes used before a measure word, especially in Beijing)"
                    },
                    "个": {
                                "pinyin": "ge4",
                                "meaning": "(a measure word)/individual"
                    },
                    "们": {
                                "pinyin": "men",
                                "meaning": "(plural marker for pronouns and a few animate nouns)"
                    },
                    "为": {
                                "pinyin": "wei2/wei4",
                                "meaning": "act as/take...to be/to be/to do/to serve as/to become, because of/for/to"
                    },
                    "国": {
                                "pinyin": "guo2",
                                "meaning": "country/state/nation"
                    },
                    "地": {
                                "pinyin": "de/di4",
                                "meaning": "(subor. part. adverbial)/-ly, earth/ground/field/place/land"
                    },
                    "到": {
                                "pinyin": "dao4",
                                "meaning": "to (a place)/until (a time)/up to/to go/to arrive"
                    },
                    "以": {
                                "pinyin": "yi3",
                                "meaning": "to use/according to/so as to/in order to/by/with/because/Israel (abbrev.)"
                    },
                    "时": {
                                "pinyin": "shi2",
                                "meaning": "o'clock/time/when/hour/season/period"
                    },
                    "要": {
                                "pinyin": "yao1/yao4",
                                "meaning": "demand/ask/request/coerce, important/vital/to want/to be going to/must"
                    },
                    "就": {
                                "pinyin": "jiu4",
                                "meaning": "at once/then/right away/only/(emphasis)/to approach/to move towards/to undertake"
                    },
                    "会": {
                                "pinyin": "hui4/kuai4",
                                "meaning": "can/be possible/be able to/to assemble/to meet/to gather/to see/union/group/association, to balance an account/accounting"
                    },
                    "可": {
                                "pinyin": "ke3",
                                "meaning": "can/may/able to/certain(ly)/to suit/(particle used for emphasis)"
                    },
                    "你": {
                                "pinyin": "ni3",
                                "meaning": "you"
                    },
                    "对": {
                                "pinyin": "dui4",
                                "meaning": "couple/pair/to be opposite/to oppose/to face/for/to/correct (answer)/to answer/to reply/to direct (towards sth)/right"
                    },
                    "能": {
                                "pinyin": "neng2",
                                "meaning": "can/may/capable/energy/able"
                    },
                    "得": {
                                "pinyin": "de2/de/dei3",
                                "meaning": "obtain/get/gain/proper/suitable/proud/contented/allow/permit/ready/finished, a sentence particle used after a verb to show effect/degree or possibility, to have to/must/ought to/to need to"
                    },
                    "着": {
                                "pinyin": "zhao1/zhao2/zhe/zhu4/zhuo2",
                                "meaning": "catch/receive/suffer, part. indicates the successful result of a verb/to touch/to come in contact with/to feel/to be affected by/to catch fire/to fall asleep/to burn, -ing part. (indicates an action in progress)/part. coverb-forming after some verbs, to make known/to show/to prove/to write/book/outstanding, to wear (clothes)/to contact/to use/to apply"
                    },
                    "过": {
                                "pinyin": "guo4",
                                "meaning": "(experienced action marker)/to cross/to go over/to pass (time)/to celebrate (a holiday)/to live/to get along/(surname)/excessively/too-"
                    },
                    "后": {
                                "pinyin": "hou4",
                                "meaning": "empress/queen/surname, back/behind/rear/afterwards/after/later"
                    },
                    "作": {
                                "pinyin": "zuo4",
                                "meaning": "to regard as/to take (somebody) for/to do/to make"
                    },
                    "道": {
                                "pinyin": "dao4",
                                "meaning": "direction/way/method/road/path/principle/truth/reason/skill/method/Tao (of Taoism)/a measure word/to say/to speak/to talk"
                    },
                    "行": {
                                "pinyin": "hang2/xing2/xing4",
                                "meaning": "a row/profession/professional, all right/capable/competent/OK/okay/to go/to do/to travel/temporary/to walk/to go/will do, behavior/conduct"
                    },
                    "然": {
                                "pinyin": "ran2",
                                "meaning": "correct/right/so/thus/like this/-ly"
                    },
                    "家": {
                                "pinyin": "jia1",
                                "meaning": "furniture/tool, -ist/-er/-ian/home/family/a person engaged in a certain art or profession"
                    },
                    "方": {
                                "pinyin": "fang1",
                                "meaning": "square/quadrilateral/direction/just"
                    },
                    "多": {
                                "pinyin": "duo1",
                                "meaning": "many/much/a lot of/numerous/multi-"
                    },
                    "经": {
                                "pinyin": "jing1",
                                "meaning": "classics/sacred book/pass through/to undergo/scripture"
                    },
                    "么": {
                                "pinyin": "ma/me/yao1",
                                "meaning": "(interrog. part.), (interrog. suff.), one on dice/small"
                    },
                    "去": {
                                "pinyin": "qu4",
                                "meaning": "to go/to leave/to remove"
                    },
                    "法": {
                                "pinyin": "fa3",
                                "meaning": "law/method/way/Buddhist teaching/Legalist/France (abbrev.)"
                    },
                    "学": {
                                "pinyin": "xue2",
                                "meaning": "learn/study/science/-ology"
                    },
                    "如": {
                                "pinyin": "ru2",
                                "meaning": "as (if)/such as"
                    },
                    "同": {
                                "pinyin": "tong2",
                                "meaning": "like/same/similar/together/alike/with"
                    },
                    "现": {
                                "pinyin": "xian4",
                                "meaning": "appear/present/now/existing/current"
                    },
                    "没": {
                                "pinyin": "mei2/mo4",
                                "meaning": "(negative prefix for verbs)/have not/not, drowned/to end/to die/to inundate"
                    },
                    "动": {
                                "pinyin": "dong4",
                                "meaning": "to use/to act/to move/to change"
                    },
                    "起": {
                                "pinyin": "qi3",
                                "meaning": "to rise/to raise/to get up"
                    },
                    "分": {
                                "pinyin": "fen1/fen4",
                                "meaning": "to divide/minute/(a measure word)/(a unit of length = 0.33 centimeter), part"
                    },
                    "还": {
                                "pinyin": "hai2/huan2/huan4",
                                "meaning": "also/in addition/more/still/else/still/yet/(not) yet, (surname)/pay back/return"
                    },
                    "进": {
                                "pinyin": "jin4",
                                "meaning": "advance/enter/to come in"
                    },
                    "好": {
                                "pinyin": "hao3/hao4",
                                "meaning": "good/well, be fond of"
                    },
                    "小": {
                                "pinyin": "xiao3",
                                "meaning": "small/tiny/few/young"
                    },
                    "部": {
                                "pinyin": "bu4",
                                "meaning": "ministry/department/section/part/division/troops/board/(a measure word)/(a measure word for works of literature, films, machines, etc.)"
                    },
                    "些": {
                                "pinyin": "xie1",
                                "meaning": "some/few/several/(a measure word)"
                    },
                    "主": {
                                "pinyin": "zhu3",
                                "meaning": "to own/to host/master/lord/primary"
                    },
                    "理": {
                                "pinyin": "li3",
                                "meaning": "reason/logic/science/inner principle or structure"
                    },
                    "心": {
                                "pinyin": "xin1",
                                "meaning": "heart/mind"
                    },
                    "她": {
                                "pinyin": "ta1",
                                "meaning": "she"
                    },
                    "前": {
                                "pinyin": "qian2",
                                "meaning": "before/in front/ago/former/previous/earlier/front"
                    },
                    "但": {
                                "pinyin": "dan4",
                                "meaning": "but/yet/however/only/merely/still"
                    },
                    "因": {
                                "pinyin": "yin1",
                                "meaning": "cause/reason/because"
                    },
                    "只": {
                                "pinyin": "qi2/zhi1/zhi3",
                                "meaning": "earth-spirit/peace, (a measure word, for birds and some animals, etc.)/single/only, M for one of a pair, only/merely/just/but, but/only"
                    },
                    "从": {
                                "pinyin": "cong1/cong2/zong4",
                                "meaning": "lax/yielding/unhurried, from/obey/observe/follow, second cousin"
                    },
                    "想": {
                                "pinyin": "xiang3",
                                "meaning": "to think/to believe/to suppose/to wish/to want/to miss"
                    },
                    "实": {
                                "pinyin": "shi2",
                                "meaning": "real/true/honest/really/solid"
                    },
                    "日": {
                                "pinyin": "ri4",
                                "meaning": "Japan/day/sun/date/day of the month"
                    },
                    "军": {
                                "pinyin": "jun1",
                                "meaning": "army/military/arms"
                    },
                    "意": {
                                "pinyin": "yi4",
                                "meaning": "idea/meaning/wish/desire/(abbr.) Italy"
                    },
                    "力": {
                                "pinyin": "li4",
                                "meaning": "power/force/strength"
                    },
                    "它": {
                                "pinyin": "ta1",
                                "meaning": "it"
                    },
                    "把": {
                                "pinyin": "ba3/ba4",
                                "meaning": "(a measure word)/(marker for direct-object)/to hold/to contain/to grasp/to take hold of, handle"
                    },
                    "机": {
                                "pinyin": "ji1",
                                "meaning": "machine/opportunity/secret"
                    },
                    "公": {
                                "pinyin": "gong1",
                                "meaning": "just/honorable (designation)/public/common"
                    },
                    "使": {
                                "pinyin": "shi3",
                                "meaning": "to make/to cause/to enable/to use/to employ/messenger"
                    },
                    "情": {
                                "pinyin": "qing2",
                                "meaning": "feeling/emotion/passion/situation"
                    },
                    "明": {
                                "pinyin": "ming2",
                                "meaning": "clear/bright/to understand/next/the Ming dynasty"
                    },
                    "性": {
                                "pinyin": "xing4",
                                "meaning": "sex/nature/surname/suffix corresponding to -ness or -ity"
                    },
                    "全": {
                                "pinyin": "quan2",
                                "meaning": "all/whole/entire/every/complete"
                    },
                    "三": {
                                "pinyin": "san1",
                                "meaning": "three/3"
                    },
                    "点": {
                                "pinyin": "dian3",
                                "meaning": "(downwards-right convex character stroke)/o'clock/(a measure word)/point/dot/(decimal) point)"
                    },
                    "外": {
                                "pinyin": "wai4",
                                "meaning": "outside/in addition/foreign/external"
                    },
                    "将": {
                                "pinyin": "jiang1/jiang4",
                                "meaning": "(will, shall, \"future tense\")/ready/prepared/to get/to use, a general"
                    },
                    "高": {
                                "pinyin": "gao1",
                                "meaning": "high/tall"
                    },
                    "间": {
                                "pinyin": "jian1/jian4",
                                "meaning": "between/among/space/(measure word), interstice/separate"
                    },
                    "问": {
                                "pinyin": "wen4",
                                "meaning": "to ask"
                    },
                    "很": {
                                "pinyin": "hen3",
                                "meaning": "very/extremely"
                    },
                    "战": {
                                "pinyin": "zhan4",
                                "meaning": "to fight/fight/war/battle"
                    },
                    "向": {
                                "pinyin": "xiang4",
                                "meaning": "direction/part/side/towards/to/guide/opposite to, guide/opposite to"
                    },
                    "头": {
                                "pinyin": "tou2/tou",
                                "meaning": "head, suff. for nouns"
                    },
                    "体": {
                                "pinyin": "ti3",
                                "meaning": "body/form/style/system"
                    },
                    "相": {
                                "pinyin": "xiang1/xiang4",
                                "meaning": "each other/one another/mutually, appearance/portrait/picture"
                    },
                    "见": {
                                "pinyin": "jian4/xian4",
                                "meaning": "to see/to meet/to appear (to be sth)/to interview, appear"
                    },
                    "被": {
                                "pinyin": "bei4",
                                "meaning": "by (marker for passive-voice sentences or clauses)/quilt/blanket/to cover/to wear"
                    },
                    "利": {
                                "pinyin": "li4",
                                "meaning": "advantage/benefit/profit/sharp"
                    },
                    "什": {
                                "pinyin": "shen2/shi2",
                                "meaning": "what, tenth (used in fractions)"
                    },
                    "二": {
                                "pinyin": "er4",
                                "meaning": "two/2"
                    },
                    "等": {
                                "pinyin": "deng3",
                                "meaning": "class/rank/grade/equal to/same as/wait for/await/et cetera/and so on"
                    },
                    "产": {
                                "pinyin": "chan3",
                                "meaning": "to reproduce/to produce/give birth/products/produce/resources/estate/property"
                    },
                    "或": {
                                "pinyin": "huo4",
                                "meaning": "maybe/perhaps/might/possibly/or"
                    },
                    "新": {
                                "pinyin": "xin1",
                                "meaning": "meso- (chem.)/new/newly"
                    },
                    "制": {
                                "pinyin": "zhi4",
                                "meaning": "system/to make/to manufacture/to control/to regulate, manufacture"
                    },
                    "加": {
                                "pinyin": "jia1",
                                "meaning": "to add/plus"
                    },
                    "斯": {
                                "pinyin": "si1",
                                "meaning": "(phonetic)/this"
                    },
                    "月": {
                                "pinyin": "yue4",
                                "meaning": "moon/month"
                    },
                    "话": {
                                "pinyin": "hua4",
                                "meaning": "dialect/language/spoken words/speech/talk/words/conversation/what someone said"
                    },
                    "合": {
                                "pinyin": "ge3/he2",
                                "meaning": "one-tenth of a peck, Chinese musical note/fit/to join"
                    },
                    "回": {
                                "pinyin": "hui2",
                                "meaning": "(a measure word for matters or actions) a time/to circle/to go back/to turn around/to answer/to return/to revolve/Islam"
                    },
                    "特": {
                                "pinyin": "te2/te4",
                                "meaning": "special/unusual/extraordinary, male animal/special (-ly)"
                    },
                    "代": {
                                "pinyin": "dai4",
                                "meaning": "substitute/replace/generation/dynasty/geological era/era/age/period"
                    },
                    "信": {
                                "pinyin": "xin4",
                                "meaning": "letter/true/to believe/sign/evidence"
                    },
                    "给": {
                                "pinyin": "gei3/ji3",
                                "meaning": "to/for/for the benefit of/to give/to allow/to do sth (for sb)/(passive particle), to supply/provide"
                    },
                    "位": {
                                "pinyin": "wei4",
                                "meaning": "position/location/(measure word for persons)/place/seat"
                    },
                    "次": {
                                "pinyin": "ci4",
                                "meaning": "nth/number (of times)/order/sequence/next/second(ary)/(measure word)"
                    },
                    "度": {
                                "pinyin": "du4",
                                "meaning": "capacity/degree/standard"
                    },
                    "门": {
                                "pinyin": "men2",
                                "meaning": "opening/door/gate/doorway/gateway/valve/switch/way to do something/knack/family/house/(religious) sect/school (of thought)/class/category/phylum or division (taxonomy)"
                    },
                    "任": {
                                "pinyin": "ren4",
                                "meaning": "to assign/to appoint/office/responsibility"
                    },
                    "常": {
                                "pinyin": "chang2",
                                "meaning": "always/ever/often/frequently/common/general/constant"
                    },
                    "海": {
                                "pinyin": "hai3",
                                "meaning": "ocean/sea"
                    },
                    "通": {
                                "pinyin": "tong1",
                                "meaning": "go through/know well/to connect/to communicate/open"
                    },
                    "教": {
                                "pinyin": "jiao1/jiao4",
                                "meaning": "teach, religion/teaching"
                    },
                    "儿": {
                                "pinyin": "er2/er",
                                "meaning": "son, non-syllabic dimi. suff."
                    },
                    "提": {
                                "pinyin": "di1/ti2",
                                "meaning": "carry (suspended), to carry/to lift/to put forward/(upwards character stroke)/lifting (brush stroke in painting)/to mention"
                    },
                    "立": {
                                "pinyin": "li4",
                                "meaning": "set up/to stand"
                    },
                    "员": {
                                "pinyin": "yuan2",
                                "meaning": "person/employee/member"
                    },
                    "解": {
                                "pinyin": "jie3/jie4/xie4",
                                "meaning": "to separate/to divide/to break up/to loosen/to explain/to untie/to emancipate, transport under guard, (surname)"
                    },
                    "真": {
                                "pinyin": "zhen1",
                                "meaning": "real/true/genuine"
                    },
                    "论": {
                                "pinyin": "lun2/lun4",
                                "meaning": "the Analects (of Confucius), by the/per/discuss/theory/to talk (about)/to discuss"
                    },
                    "义": {
                                "pinyin": "yi4",
                                "meaning": "justice/righteousness/meaning"
                    },
                    "几": {
                                "pinyin": "ji1/ji3",
                                "meaning": "small table, almost, a few/how many, how much/how many/several/a few"
                    },
                    "口": {
                                "pinyin": "kou3",
                                "meaning": "mouth/(a measure word)"
                    },
                    "认": {
                                "pinyin": "ren4",
                                "meaning": "to recognize/to know/to admit"
                    },
                    "条": {
                                "pinyin": "tiao2",
                                "meaning": "measure word for long, thin things (i.e. ribbon, river, etc.)/a strip/item/article"
                    },
                    "平": {
                                "pinyin": "ping2",
                                "meaning": "flat/level/equal/to make the same score/to tie/to draw/calm/peaceful"
                    },
                    "气": {
                                "pinyin": "qi4",
                                "meaning": "air/anger/gas, gas/air/smell/weather/vital breath/to make sb. angry/to get angry/to be enraged"
                    },
                    "题": {
                                "pinyin": "ti2",
                                "meaning": "topic/subject/to inscribe/to superscribe"
                    },
                    "活": {
                                "pinyin": "huo2",
                                "meaning": "to live/alive/living/work/workmanship"
                    },
                    "尔": {
                                "pinyin": "er3",
                                "meaning": "thus/so/like that/you/thou"
                    },
                    "别": {
                                "pinyin": "bie2/bie4",
                                "meaning": "leave/depart/separate/distinguish/classify/other/another/do not/must not/to pin, contrary/difficult/awkward"
                    },
                    "打": {
                                "pinyin": "da2/da3",
                                "meaning": "dozen, beat/strike/break/mix up/build/fight/fetch/make/tie up/issue/shoot/calculate/since/from"
                    },
                    "变": {
                                "pinyin": "bian4",
                                "meaning": "to change/to become different/to transform/to vary/rebellion"
                    },
                    "神": {
                                "pinyin": "shen2",
                                "meaning": "God/unusual/mysterious/soul/spirit/divine essence/lively/spiritual being"
                    },
                    "总": {
                                "pinyin": "zong3",
                                "meaning": "always/to assemble/gather/total/overall/head/chief/general/in every case"
                    },
                    "何": {
                                "pinyin": "he2",
                                "meaning": "carry/what/how/why/which"
                    },
                    "数": {
                                "pinyin": "shu3/shu4/shuo4",
                                "meaning": "to count, number/figure/to count/to calculate/several, frequently/repeatedly"
                    },
                    "安": {
                                "pinyin": "an1",
                                "meaning": "content/calm/still/quiet/to pacify/peace"
                    },
                    "少": {
                                "pinyin": "shao3/shao4",
                                "meaning": "few/little/lack, young"
                    },
                    "结": {
                                "pinyin": "jie1/jie2",
                                "meaning": "knot/sturdy/to bear (fruit)/bond/to tie/to bind"
                    },
                    "受": {
                                "pinyin": "shou4",
                                "meaning": "to bear/to stand/to endure/(passive marker)/to receive"
                    },
                    "量": {
                                "pinyin": "liang2/liang4",
                                "meaning": "to measure, capacity/quantity/amount/to estimate"
                    },
                    "感": {
                                "pinyin": "gan3",
                                "meaning": "to feel/to move/to touch/to affect"
                    },
                    "务": {
                                "pinyin": "wu4",
                                "meaning": "affair/business/matter"
                    },
                    "做": {
                                "pinyin": "zuo4",
                                "meaning": "to do/to make/to produce"
                    },
                    "接": {
                                "pinyin": "jie1",
                                "meaning": "to extend/to connect/to receive/to join"
                    },
                    "场": {
                                "pinyin": "chang3",
                                "meaning": "a courtyard/open space/place/field/a measure word/(a measure word, used for sport or recreation)"
                    },
                    "件": {
                                "pinyin": "jian4",
                                "meaning": "a measure word for thing, clothes, item"
                    },
                    "计": {
                                "pinyin": "ji4",
                                "meaning": "to calculate/to compute/to count/reckon/ruse/to plan"
                    },
                    "管": {
                                "pinyin": "guan3",
                                "meaning": "to take care (of)/to control/to manage/to be in charge of/to look after/to run/tube/pipe"
                    },
                    "期": {
                                "pinyin": "qi1",
                                "meaning": "a period of time/phase/stage/(used for issue of a periodical, courses of study)/time/term/period/to hope"
                    },
                    "德": {
                                "pinyin": "de2",
                                "meaning": "Germany/virtue/goodness/morality/ethics/kindness/favor/character/kind"
                    },
                    "资": {
                                "pinyin": "zi1",
                                "meaning": "resources/capital/to provide/to supply/to support/money/expense"
                    },
                    "命": {
                                "pinyin": "ming4",
                                "meaning": "life/fate"
                    },
                    "金": {
                                "pinyin": "jin1",
                                "meaning": "metal/money/gold"
                    },
                    "指": {
                                "pinyin": "zhi3",
                                "meaning": "finger/to point/to direct/to indicate"
                    },
                    "许": {
                                "pinyin": "xu3",
                                "meaning": "to allow/to permit/to praise/(surname)"
                    },
                    "统": {
                                "pinyin": "tong3",
                                "meaning": "to gather/to unite/to unify/whole"
                    },
                    "区": {
                                "pinyin": "ou1/qu1",
                                "meaning": "Ou (surname), area/region/district/small/distinguish"
                    },
                    "保": {
                                "pinyin": "bao3",
                                "meaning": "to defend/to protect/to insure or guarantee/to maintain/hold or keep/to guard"
                    },
                    "至": {
                                "pinyin": "zhi4",
                                "meaning": "arrive/most/to/until"
                    },
                    "队": {
                                "pinyin": "dui4",
                                "meaning": "squadron/team/group"
                    },
                    "形": {
                                "pinyin": "xing2",
                                "meaning": "to appear/to look/form/shape"
                    },
                    "社": {
                                "pinyin": "she4",
                                "meaning": "society/group"
                    },
                    "便": {
                                "pinyin": "bian4/pian2",
                                "meaning": "ordinary/plain/convenient/handy/easy/then/so/thus/to relieve oneself, advantageous/cheap"
                    },
                    "空": {
                                "pinyin": "kong1/kong4",
                                "meaning": "air/sky/empty/in vain, emptied/leisure"
                    },
                    "决": {
                                "pinyin": "jue2",
                                "meaning": "breach (a dyke)/to decide/to determine"
                    },
                    "治": {
                                "pinyin": "zhi4",
                                "meaning": "to rule/to govern/to manage/to control/to harness (a river)/cure/treatment/to heal"
                    },
                    "展": {
                                "pinyin": "zhan3",
                                "meaning": "to use/to spread out/to postpone/to unfold"
                    },
                    "马": {
                                "pinyin": "ma3",
                                "meaning": "horse/horse chess piece/Surname"
                    },
                    "科": {
                                "pinyin": "ke1",
                                "meaning": "branch of study/administrative section/division/field/branch/stage directions/family (taxonomy)/rules/laws/to mete out (punishment)/to levy (taxes, etc.)/to fine somebody"
                    },
                    "司": {
                                "pinyin": "si1",
                                "meaning": "company/control"
                    },
                    "基": {
                                "pinyin": "ji1",
                                "meaning": "base/foundation/basic/radical (chem.)"
                    },
                    "眼": {
                                "pinyin": "yan3",
                                "meaning": "eye"
                    },
                    "非": {
                                "pinyin": "fei1",
                                "meaning": "non-/not-/un-"
                    },
                    "则": {
                                "pinyin": "ze2",
                                "meaning": "(expresses contrast with a previous sentence or clause)/standard/norm/rule/to imitate/to follow/then/principle"
                    },
                    "听": {
                                "pinyin": "ting1/ting4",
                                "meaning": "listen/hear/obey, let/allow"
                    },
                    "却": {
                                "pinyin": "que4",
                                "meaning": "but/yet/however/while/to go back/to decline/to retreat/nevertheless"
                    },
                    "达": {
                                "pinyin": "da2",
                                "meaning": "attain/pass through/achieve/reach/realize/clear/inform/notify/dignity"
                    },
                    "光": {
                                "pinyin": "guang1",
                                "meaning": "light/ray/bright"
                    },
                    "放": {
                                "pinyin": "fang4",
                                "meaning": "to release/to free/to let go/to put/to place/to let out"
                    },
                    "强": {
                                "pinyin": "qiang2",
                                "meaning": "strength/force/power/powerful/better"
                    },
                    "即": {
                                "pinyin": "ji2",
                                "meaning": "namely/right away/to approach/to draw near"
                    },
                    "权": {
                                "pinyin": "quan2",
                                "meaning": "authority/power/right"
                    },
                    "思": {
                                "pinyin": "si1",
                                "meaning": "to think/to consider"
                    },
                    "完": {
                                "pinyin": "wan2",
                                "meaning": "to finish/to be over/whole/complete/entire"
                    },
                    "设": {
                                "pinyin": "she4",
                                "meaning": "to set up/to arrange/to establish/to found/to display"
                    },
                    "式": {
                                "pinyin": "shi4",
                                "meaning": "type/form/pattern/style"
                    },
                    "路": {
                                "pinyin": "lu4",
                                "meaning": "(surname)/road/path/way"
                    },
                    "记": {
                                "pinyin": "ji4",
                                "meaning": "to remember/to note/mark/sign/to record"
                    },
                    "南": {
                                "pinyin": "nan2",
                                "meaning": "south"
                    },
                    "品": {
                                "pinyin": "pin3",
                                "meaning": "conduct/grade/thing/product/good"
                    },
                    "住": {
                                "pinyin": "zhu4",
                                "meaning": "to live/to dwell/to reside/to stop"
                    },
                    "告": {
                                "pinyin": "gao4",
                                "meaning": "to tell/to inform/to say"
                    },
                    "类": {
                                "pinyin": "lei4",
                                "meaning": "kind/type/class/category/similar/like/to resemble"
                    },
                    "据": {
                                "pinyin": "ju1/ju4",
                                "meaning": "sickness of hand, act in accordance with/seize, according to/to act in accordance with/to depend on/to seize/to occupy"
                    },
                    "程": {
                                "pinyin": "cheng2",
                                "meaning": "rule/order/regulations/formula/journey/procedure/sequence/a surname"
                    },
                    "北": {
                                "pinyin": "bei3",
                                "meaning": "north"
                    },
                    "边": {
                                "pinyin": "bian1",
                                "meaning": "side/edge/margin/border/boundary"
                    },
                    "张": {
                                "pinyin": "zhang1",
                                "meaning": "(a measure word)/(a surname)/open up"
                    },
                    "该": {
                                "pinyin": "gai1",
                                "meaning": "that/the above-mentioned/most likely/to deserve/should/ought to/owe"
                    },
                    "交": {
                                "pinyin": "jiao1",
                                "meaning": "to deliver/to turn over/to make friends/to intersect (lines)/to pay (money)"
                    },
                    "规": {
                                "pinyin": "gui1",
                                "meaning": "compass/rule"
                    },
                    "拉": {
                                "pinyin": "la1",
                                "meaning": "to pull/to play (string instruments)/to drag/to draw"
                    },
                    "格": {
                                "pinyin": "ge2",
                                "meaning": "frame/rule"
                    },
                    "望": {
                                "pinyin": "wang4",
                                "meaning": "hope/expect/to visit/to gaze (into the distance)/look towards/towards"
                    },
                    "觉": {
                                "pinyin": "jiao4/jue2",
                                "meaning": "a nap/a sleep, feel/find that/thinking/awake/aware"
                    },
                    "领": {
                                "pinyin": "ling3",
                                "meaning": "neck/collar/to lead/to receive"
                    },
                    "共": {
                                "pinyin": "gong4",
                                "meaning": "all together/in while/to share/common/general/together"
                    },
                    "确": {
                                "pinyin": "que4",
                                "meaning": "authenticated/solid/firm, authenticated/solid/firm/real/true"
                    },
                    "传": {
                                "pinyin": "chuan2/zhuan4",
                                "meaning": "to pass on/to spread/to transmit/to infect/to transfer/to circulate/to pass on/to conduct (electricity), biography"
                    },
                    "师": {
                                "pinyin": "shi1",
                                "meaning": "a division (milit.)/teacher/master/expert/model"
                    },
                    "观": {
                                "pinyin": "guan1/guan4",
                                "meaning": "to look at/to watch/to observe/to behold, Taoist monastery"
                    },
                    "清": {
                                "pinyin": "qing1",
                                "meaning": "clear/distinct/complete/pure"
                    },
                    "今": {
                                "pinyin": "jin1",
                                "meaning": "today/modern/present/current/this/now"
                    },
                    "切": {
                                "pinyin": "qie1/qie4",
                                "meaning": "to cut/to slice, close to"
                    },
                    "院": {
                                "pinyin": "yuan4",
                                "meaning": "courtyard/institution"
                    },
                    "让": {
                                "pinyin": "rang4",
                                "meaning": "to ask/to let/permit/have (someone do something)/to yield/to allow"
                    },
                    "识": {
                                "pinyin": "shi2/zhi4",
                                "meaning": "to know/knowledge, to record/write a footnote"
                    },
                    "京": {
                                "pinyin": "jing1",
                                "meaning": "capital/Beijing (abbrev.)"
                    },
                    "水": {
                                "pinyin": "shui3",
                                "meaning": "water/river"
                    },
                    "淼": {
                                "pinyin": "miao3",
                                "meaning": "a flood/infinity"
                    },
                    "火": {
                                "pinyin": "huo3",
                                "meaning": "fire"
                    },
                    "炎": {
                                "pinyin": "yan2",
                                "meaning": "flame/inflammation/-itis"
                    },
                    "焱": {
                                "pinyin": "yan4",
                                "meaning": "flames"
                    },
                    "池": {
                                "pinyin": "chi2",
                                "meaning": "pond/reservoir"
                    },
                    "沙": {
                                "pinyin": "sha1",
                                "meaning": "granule/hoarse/raspy/sand/powder"
                    },
                    "彩": {
                                "pinyin": "cai3",
                                "meaning": "(bright) color/variety/applause/applaud/(lottery) prize, colored/variegated"
                    },
                    "财": {
                                "pinyin": "cai2",
                                "meaning": "money/wealth/riches/property/valuables"
                    },
                    "富": {
                                "pinyin": "fu4",
                                "meaning": "rich"
                    },
                    "逗": {
                                "pinyin": "dou4",
                                "meaning": "linger"
                    },
                    "雨": {
                                "pinyin": "yu3",
                                "meaning": "rain"
                    },
                    "姐": {
                                "pinyin": "jie3",
                                "meaning": "older sister"
                    },
                    "笑": {
                                "pinyin": "xiao4",
                                "meaning": "laugh/smile"
                    },
                    "是": {
                                "pinyin": "shi4",
                                "meaning": "is/are/am/yes/to be"
                    },
                    "处": {
                                "pinyin": "chu3/chu4",
                                "meaning": "to reside/to live/to dwell/to be in/to stay/get along with/to be in a position of/deal with, a place/location/spot/point/office/department/bureau/respect"
                    },
                    "呢": {
                                "pinyin": "ne/ni2",
                                "meaning": "(question particle), woolen material"
                    },
                    "收": {
                                "pinyin": "shou1",
                                "meaning": "to receive/to accept/to collect/in care of (used on address line after name)"
                    },
                    "您": {
                                "pinyin": "nin2",
                                "meaning": "you (formal)"
                    },
                    "悠": {
                                "pinyin": "you1",
                                "meaning": "at ease/long (in time)/sad"
                    },
                    "远": {
                                "pinyin": "yuan3",
                                "meaning": "far/distant/remote"
                    },
                    "圆": {
                                "pinyin": "yuan2",
                                "meaning": "circle/round/circular/spherical/(of the moon) full/unit of Chinese currency (Yuan)/tactful/to justify"
                    },
                    "园": {
                                "pinyin": "yuan2",
                                "meaning": "garden"
                    },
                    "难": {
                                "pinyin": "nan2/nan4",
                                "meaning": "difficult (to...)/problem/difficulty/difficult/not good, disaster/distress/to scold"
                    },
                    "鸡": {
                                "pinyin": "ji1",
                                "meaning": "fowl/chicken"
                    },
                    "鸣": {
                                "pinyin": "ming2",
                                "meaning": "to cry (of birds)"
                    }
        };

        // ==================== DOM 元素 ====================
        const guessInput = document.getElementById('guessInput');
        const guessBtn = document.getElementById('guessBtn');
        const hintBtn = document.getElementById('hintBtn');
        const guessCountDisplay = document.getElementById('guessCount');
        const guessCountContainer = document.getElementById('guessCountContainer');
        const hintDisplay = document.getElementById('hintDisplay');
        const inputSvgOverlay = document.getElementById('inputSvgOverlay');
        const historyGrid = document.getElementById('historyGrid');
        const detailPanel = document.getElementById('detailPanel');
        const detailCloseBtn = document.getElementById('detailCloseBtn');
        const detailGlyph = document.getElementById('detailGlyph');
        const detailSimilarity = document.getElementById('detailSimilarity');
        const overlay = document.getElementById('overlay');
        const appContainer = document.getElementById('appContainer');
        const winModal = document.getElementById('winModal');
        const modalTarget = document.getElementById('modalTarget');
        const modalGuessCount = document.getElementById('modalGuessCount');
        const winModalMessage = document.getElementById('winModalMessage');
        const playAgainBtn = document.getElementById('playAgainBtn');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const themeBtn = document.getElementById('themeBtn');
        const colorBlindBtn = document.getElementById('colorBlindBtn');
        const helpBtn = document.getElementById('helpBtn');
        const helpModal = document.getElementById('helpModal');
        const helpCloseBtn = document.getElementById('helpCloseBtn');
        const helpConfusedBtn = document.getElementById('helpConfusedBtn');
        const tutorialModal = document.getElementById('tutorialModal');
        const tutorialCloseBtn = document.getElementById('tutorialCloseBtn');
        const tutorialTitle = document.getElementById('tutorialTitle');
        const tutorialBody = document.getElementById('tutorialBody');
        const tutorialActions = document.getElementById('tutorialActions');
        const tutorialCoach = document.getElementById('tutorialCoach');
        const tutorialCoachTitle = document.getElementById('tutorialCoachTitle');
        const tutorialCoachBody = document.getElementById('tutorialCoachBody');
        const tutorialCoachActions = document.getElementById('tutorialCoachActions');
        const debugModal = document.getElementById('debugModal');
        const debugCloseBtn = document.getElementById('debugCloseBtn');
        const debugLock = document.getElementById('debugLock');
        const debugPasswordInput = document.getElementById('debugPasswordInput');
        const debugUnlockBtn = document.getElementById('debugUnlockBtn');
        const debugError = document.getElementById('debugError');
        const debugContent = document.getElementById('debugContent');
        const debugInfo = document.getElementById('debugInfo');
        const debugEndRoundBtn = document.getElementById('debugEndRoundBtn');
        const debugTargetInput = document.getElementById('debugTargetInput');
        const debugSetTargetBtn = document.getElementById('debugSetTargetBtn');
        const giveUpBtn = document.getElementById('giveUpBtn');
        const loseModal = document.getElementById('loseModal');
        const loseModalTarget = document.getElementById('loseModalTarget');
        const loseModalGuessCount = document.getElementById('loseModalGuessCount');
        const loseModalMessage = document.getElementById('loseModalMessage');
        const losePlayAgainBtn = document.getElementById('losePlayAgainBtn');
        const loseModalCloseBtn = document.getElementById('loseModalCloseBtn');
        const iconAuto = document.getElementById('iconAuto');
        const iconLight = document.getElementById('iconLight');
        const iconDark = document.getElementById('iconDark');
        const detailWarning = document.getElementById('detailWarning');
        const charListModal = document.getElementById('charListModal');
        const charListGrid = document.getElementById('charListGrid');
        const charListCloseBtn = document.getElementById('charListCloseBtn');
        const helpGotItBtn = document.getElementById('helpGotItBtn');
        const handwriteBtn = document.getElementById('handwriteBtn');
        const handwriteModal = document.getElementById('handwriteModal');
        const handwriteCloseBtn = document.getElementById('handwriteCloseBtn');
        const handwriteCanvas = document.getElementById('handwriteCanvas');
        const handwriteUndoBtn = document.getElementById('handwriteUndoBtn');
        const handwriteClearBtn = document.getElementById('handwriteClearBtn');
        const handwriteCandidates = document.getElementById('handwriteCandidates');

        // 手写识别状态
        let handwriteStrokes = [];
        let currentStroke = [];
        let isDrawing = false;
        let handwriteCtx = null;
        let hanziLookupLoaded = false;
        let hanziLookupLoading = false;
        
        // 手写识别引擎
        let currentEngine = 'google'; // 'hanzilookup' | 'proxy' | 'google'
        let proxyIMEAvailable = null; // null=未测试, true=可用, false=不可用
        let googleIMEAvailable = null; // null=未测试, true=可用, false=不可用
        const PROXY_IME_URL = 'https://gle-ime.yoyo250.fun/';
        const GOOGLE_IME_URL = 'https://inputtools.google.com/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8';
        const handwriteEngineSelect = document.getElementById('handwriteEngineSelect');
        const handwriteEngineStatus = document.getElementById('handwriteEngineStatus');
        const dictBtn = document.getElementById('dictBtn');

        // 主题状态：0=跟随系统, 1=第一次点击, 2=第二次点击
        let themeState = 0;
        let systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let helpCountdownTimer = null;
        let helpCountdownValue = 10;
        let colorBlindMode = localStorage.getItem('colorBlindMode') !== 'false';
        let tutorialStep = 0;
        let tutorialMode = '';
        let tutorialActive = false;
        let tutorialStage = '';
        let tutorialSpotlightElement = null;
        let tutorialNudgeTimer = null;
        let lastTutorialHintPart = '';
        let tutorialAwaitingPlayAgainExit = false;
        const tutorialTarget = '襭';
        let debugAuthenticated = false;
        let debugFooterClickCount = 0;
        let debugFooterClickTimer = null;
        let lastHintDebugText = '';
        const debugPasswordHash = '61a8edd0ac4ba8d3120d9eefdde04c88';

        // ==================== 初始化 ====================
        const loadingOverlay = document.getElementById('loadingOverlay');
        const loadingMessage = document.getElementById('loadingMessage');
        const loadingProgressBar = document.getElementById('loadingProgressBar');

        function updateGuessCountDisplay(count) {
            const prefix = window.t ? window.t('guess_count_prefix') : null;
            const suffix = window.t ? window.t('guess_count_suffix') : null;
            
            const p = prefix !== null ? prefix : '第';
            const s = suffix !== null ? suffix : '次';
            
            guessCountContainer.innerHTML = `${p} <span id="guessCount">${count}</span> ${s}`;
        }

        window.addEventListener('languageChanged', (e) => {
            updateGuessCountDisplay(guessCount);
            if ((hintTextType === 'pinyin' || hintTextType === 'meaning') && !hintDisplay.hidden) {
                renderTextHint();
            }
            if (winModal.classList.contains('show')) {
                renderWinMessage();
            }
            if (loseModal.classList.contains('show')) {
                renderLoseMessage();
            }
            if (tutorialModal.classList.contains('show')) {
                renderTutorialStart();
            }
            if (tutorialActive && !tutorialCoach.hidden) {
                renderTutorialCoach();
            }
            if (helpCountdownTimer) {
                updateHelpCountdown();
            }
            // Update handwrite candidates placeholder if empty
            const placeholder = handwriteCandidates.querySelector('.handwrite-placeholder');
            if (placeholder) {
                 const msg = (window.t && window.t('handwrite_placeholder')) || '在上方书写汉字';
                 // Check if it's the "no result" message or the default placeholder
                 if (placeholder.textContent.includes('未识别') || (window.t && placeholder.textContent === window.t('handwrite_no_result'))) {
                     placeholder.textContent = (window.t && window.t('handwrite_no_result')) || '未识别到汉字';
                 } else {
                     placeholder.textContent = msg;
                 }
            }
        });

        async function init() {
            applyTheme(); // 初始化时应用主题
            initHistoryGrid();
            
            // 显示加载浮窗
            showLoading('正在加载字体...');
            
            const loaded = await loadFont();
            if (loaded) {
                guessBtn.disabled = false;
                hideLoading();
                
                // 检查是否首次访问
                if (!localStorage.getItem('hasVisited')) {
                    showFirstTimeHelp();
                } else {
                    startNewGame();
                }
            } else {
                showLoadingError((window.t && window.t('loading_error')) || '字体加载失败，请刷新页面');
            }
            setupEventListeners();
        }

        function showFirstTimeHelp() {
            helpModal.classList.add('show');
            helpCountdownValue = 10;
            updateHelpCountdown();
            helpCountdownTimer = setInterval(() => {
                helpCountdownValue--;
                if (helpCountdownValue <= 0) {
                    closeFirstTimeHelp();
                } else {
                    updateHelpCountdown();
                }
            }, 1000);
        }

        function updateHelpCountdown() {
            const gotIt = (window.t && window.t('btn_got_it')) || '我知道了';
            helpGotItBtn.textContent = `${gotIt}(${helpCountdownValue})`;
        }

        function closeFirstTimeHelp() {
            if (helpCountdownTimer) {
                clearInterval(helpCountdownTimer);
                helpCountdownTimer = null;
            }
            helpModal.classList.remove('show');
            
            // 首次访问时才标记并开始游戏
            if (!localStorage.getItem('hasVisited')) {
                localStorage.setItem('hasVisited', 'true');
                startNewGame();
            }
        }

        function openTutorial() {
            if (helpCountdownTimer) {
                clearInterval(helpCountdownTimer);
                helpCountdownTimer = null;
            }
            helpModal.classList.remove('show');
            tutorialStep = 0;
            tutorialMode = '';
            tutorialModal.classList.add('show');
            renderTutorialStart();
        }

        function closeTutorial() {
            tutorialModal.classList.remove('show');
        }

        function uiText(zh, en) {
            return ((window.getCurrentLanguage && window.getCurrentLanguage()) === 'en_us') ? en : zh;
        }

        function renderTutorialStart() {
            tutorialTitle.textContent = uiText('🧪 交互式教学', '🧪 Interactive tutorial');
            tutorialBody.innerHTML = `
                <div class="tutorial-card">
                    <p>${uiText('这次我们开一局带教练的演示局。答案先不告诉你，跟着页面上的发光提示点就行。', 'This starts a coached demo game. I will not reveal the answer yet; follow the glowing target.')}</p>
                    <p>${uiText('系统已经把色盲模式打开了；如果你觉得自己是色彩大师，左上角 👁️ 可以关掉。', 'Color-blind mode is already on. If you are a color wizard, the eye icon in the top-left turns it off.')}</p>
                    <p>${uiText('先选你想怎么学：打字，还是手写？', 'Choose how you want to learn: typing or handwriting?')}</p>
                </div>
            `;
            tutorialActions.innerHTML = '';
            tutorialActions.appendChild(createTutorialButton(uiText('⌨️ 学打字', '⌨️ Learn typing'), () => beginGuidedGame('typing')));
            tutorialActions.appendChild(createTutorialButton(uiText('✏️ 学写字', '✏️ Learn handwriting'), () => beginGuidedGame('writing')));
        }

        function beginGuidedGame(mode) {
            tutorialModal.classList.remove('show');
            tutorialActive = true;
            tutorialMode = mode;
            tutorialStage = 'guessHu';
            startNewGame(tutorialTarget);
            renderTutorialCoach();
        }

        function renderTutorialCoach(extraMessage = '') {
            if (!tutorialActive) return;
            tutorialCoach.hidden = false;
            const content = getTutorialStageContent(extraMessage);
            tutorialCoachTitle.textContent = content.title;
            tutorialCoachBody.innerHTML = content.body;
            tutorialCoachActions.innerHTML = '';
            tutorialCoachActions.appendChild(createTutorialButton(uiText('退出教学', 'Exit tutorial'), endGuidedGame, 'secondary'));
            setTutorialSpotlight(content.element);
        }

        function getTutorialStageContent(extraMessage = '') {
            const inputAction = tutorialMode === 'writing'
                ? uiText('点「手写」，写这个字，点候选字填入输入框，再提交。', 'Click Draw, write this character, tap a candidate, then submit it.')
                : uiText('在输入框输入这个字，然后点「猜」；等 3 秒自动提交也行。', 'Type this character, then click Guess. Waiting 3 seconds also auto-submits.');
            const inputElement = tutorialMode === 'writing' ? handwriteBtn : guessInput;
            const map = {
                clickHistory: {
                    title: uiText('点开刚才那一格', 'Open the tile you just made'),
                    body: `<p>${extraMessage || uiText('猜完以后，下方历史区会出现一个小格子。点它，不要只盯着颜色发呆。', 'After guessing, a tile appears in the history area. Click it; do not just stare at the colors.')}</p><p>${uiText('这里能看到每个分块的相似度。', 'This shows the similarity score for each piece.')}</p>`,
                    element: historyGrid.querySelector('.history-tile:not(.empty)')
                },
                clickPercent: {
                    title: uiText('现在看百分比', 'Now read the percentages'),
                    body: `<p>${extraMessage || uiText('右侧详情里，每个百分比对应一个字形分块。百分比越高，越像答案里的某一块。', 'In the detail panel, each percentage belongs to one glyph piece. Higher means closer to part of the answer.')}</p><p><strong>${uiText('请点最高的那个百分比', 'Click the highest percentage')}</strong>${uiText('，它会高亮最像答案的 SVG 分块。', '; it highlights the SVG piece that is most similar to the answer.')}</p>`,
                    element: getBestSimilarityItem()
                },
                clickHint: {
                    title: uiText('还有提示按钮', 'There is also a Hint button'),
                    body: `<p>${extraMessage || uiText('如果你卡住了，可以点「提示」。它会随机给读音、一个英文释义，或者答案的一个字形分块。', 'If you get stuck, click Hint. It randomly gives pinyin, one English meaning, or one glyph piece from the answer.')}</p><p><strong>${uiText('请点「提示」', 'Click Hint')}</strong></p>`,
                    element: hintBtn
                },
                guessLi: {
                    title: uiText('继续猜一个相近结构', 'Guess a related structure'),
                    body: `<p>${extraMessage || uiText('你已经知道怎么点历史和百分比了。现在换一个相近的左侧结构。', 'Now you know how history and percentages work. Try another related left-side structure.')}</p><p><strong>${uiText('请猜：「礼」', 'Guess: 礼')}</strong></p><p>${inputAction}</p>`,
                    element: inputElement
                },
                guessHu: {
                    title: uiText('教学局：先别问答案是什么', 'Tutorial game: do not ask for the answer yet'),
                    body: `<p>${extraMessage || uiText('我们真的打一局。先从「湖」开始，看看一个复杂字会被拆成什么样。', 'We are playing a real demo round. Start with 湖 and see how a complex character gets split.')}</p><p><strong>${uiText('请猜：「湖」', 'Guess: 湖')}</strong></p><p>${inputAction}</p>`,
                    element: inputElement
                },
                guessChen: {
                    title: uiText('继续猜衣字旁方向', 'Follow the clothing-side direction'),
                    body: `<p>${extraMessage || uiText('刚才提示过后，下一步看衣字旁相关结构。', 'After that hint, continue toward the clothing-side structure.')}</p><p><strong>${uiText('请猜：「衬」', 'Guess: 衬')}</strong></p><p>${inputAction}</p>`,
                    element: inputElement
                },
                openDictionary: {
                    title: uiText('认识一下答案字典', 'Meet the answer dictionary'),
                    body: `<p>${extraMessage || uiText('如果你想确认游戏到底会从哪些字里抽答案，点左上角书本。', 'If you want to know which characters can appear, click the book in the top-left.')}</p><p><strong>${uiText('请点左上角 📖 字典', 'Click the 📖 dictionary in the top-left')}</strong></p>`,
                    element: dictBtn
                },
                surrender: {
                    title: uiText('最后：认输按钮在哪里', 'Finally: where Give Up lives'),
                    body: `<p>${extraMessage || uiText('正式局卡住时，点「认输」会直接看答案。教学局就拿它收尾。', 'In a real game, Give Up reveals the answer. We will use it to end this tutorial.')}</p><p><strong>${uiText('请点「认输」', 'Click Give Up')}</strong></p>`,
                    element: giveUpBtn
                },
                easterEgg: {
                    title: uiText('演示彩蛋结束', 'Demo easter egg complete'),
                    body: `<p>${uiText('答案是「襭」。这是演示彩蛋，实际游戏不会遇到这个字。', 'The answer was 襭. This is a demo easter egg; the real game will not use this character.')}</p><p>${uiText('正式游戏会从刚才字典里的候选字抽答案，不会突然拿冷门字砸你。', 'Real games pick answers from the dictionary you just opened; they will not ambush you with this monster.')}</p>`,
                    element: null
                },
                done: {
                    title: uiText('教学结束', 'Tutorial complete'),
                    body: `<p>${uiText('你已经点过输入、猜、历史格、百分比、字典，也知道认输在哪。正式局开始吧。', 'You used input, Guess, history tiles, percentages, dictionary, and Give Up. Time for a real game.')}</p>`,
                    element: null
                }
            };
            return map[tutorialStage] || map.done;
        }

        function handleTutorialGuess(guess) {
            if (!tutorialActive) return;
            const expected = tutorialStage === 'guessHu' ? '湖'
                : tutorialStage === 'guessChen' ? '衬'
                : tutorialStage === 'guessLi' ? '礼'
                : '';
            if (!expected) return;
            if (guess !== expected) {
                renderTutorialCoach(uiText(
                    `这把先别猜「${guess}」，请按剧本猜「${expected}」。我知道你很有想法，但教程不允许。`,
                    `Do not guess ${guess} in this tutorial. Follow the script and guess ${expected}. I admire the creativity; the tutorial does not.`
                ));
                return;
            }
            if (tutorialStage === 'guessHu') {
                tutorialStage = 'clickHistory';
                renderTutorialCoach(uiText('很好。现在不要继续猜，先点下方刚出现的历史格。', 'Good. Do not keep guessing yet; click the history tile that just appeared.'));
                return;
            }
            if (tutorialStage === 'guessChen') {
                tutorialStage = 'guessLi';
                renderTutorialCoach(uiText('「衬」猜完了。继续用相近的左侧结构，猜「礼」。', '衬 is done. Continue with a related left-side structure and guess 礼.'));
                return;
            }
            if (tutorialStage === 'guessLi') {
                tutorialStage = 'openDictionary';
                renderTutorialCoach(uiText(`「${guess}」也猜完了。现在去看看答案字典长什么样。`, `${guess} is done. Now let us see what the answer dictionary looks like.`));
                return;
            }
        }

        function handleTutorialHistoryClick() {
            if (!tutorialActive || tutorialStage !== 'clickHistory') return;
            tutorialStage = 'clickPercent';
            setTimeout(() => renderTutorialCoach(uiText('详情打开了。现在看右侧这些百分比。', 'The detail panel is open. Now look at these percentages.')), 50);
        }

        function handleTutorialSimilarityClick(item) {
            if (!tutorialActive || tutorialStage !== 'clickPercent') return;
            const bestItem = getBestSimilarityItem();
            if (bestItem && item !== bestItem) {
                renderTutorialCoach(uiText('先点最高的那个百分比。我们要教玩家优先看最像答案的分块。', 'Click the highest percentage first. We want players to inspect the piece closest to the answer.'));
                return;
            }
            tutorialStage = 'clickHint';
            setTimeout(() => renderTutorialCoach(uiText('就是这样。百分比会高亮对应分块，方便你判断哪块像答案。', 'Exactly. Percentages highlight the matching piece so you can tell which part resembles the answer.')), 50);
        }

        function getBestSimilarityItem() {
            const items = Array.from(detailSimilarity.querySelectorAll('.similarity-item'));
            if (!items.length) return null;
            return items.reduce((best, item) => {
                const currentValue = parseInt(item.querySelector('.similarity-value')?.textContent || '0', 10);
                const bestValue = parseInt(best.querySelector('.similarity-value')?.textContent || '0', 10);
                return currentValue > bestValue ? item : best;
            }, items[0]);
        }

        function handleTutorialHintClick() {
            if (!tutorialActive || tutorialStage !== 'clickHint') return;
            tutorialStage = 'guessChen';
            setTimeout(() => renderTutorialCoach(uiText('提示就这么用。下一步猜「衬」，看看衣字旁相关结构。', 'That is how hints work. Next, guess 衬 and inspect the clothing-side structure.')), 50);
        }

        function handleTutorialDictionaryClick() {
            if (!tutorialActive || tutorialStage !== 'openDictionary') return;
            tutorialStage = 'surrender';
            setTimeout(() => renderTutorialCoach(uiText('字典里是正式局答案池。看完以后，最后学一下认输按钮。', 'The dictionary is the real answer pool. After this, we will learn the Give Up button.')), 50);
        }

        function handleTutorialSurrender() {
            if (!tutorialActive || tutorialStage !== 'surrender') return;
            tutorialStage = 'easterEgg';
            tutorialAwaitingPlayAgainExit = true;
            setTimeout(() => {
                renderTutorialCoach();
                tutorialCoachActions.appendChild(createTutorialButton(uiText('开始正式随机局', 'Start a real random game'), () => {
                    loseModal.classList.remove('show');
                    tutorialActive = false;
                    tutorialAwaitingPlayAgainExit = false;
                    tutorialCoach.hidden = true;
                    setTutorialSpotlight(null);
                    startNewGame();
                }));
            }, 100);
        }

        function setTutorialSpotlight(element) {
            if (tutorialSpotlightElement) {
                tutorialSpotlightElement.classList.remove('tutorial-spotlight');
            }
            tutorialSpotlightElement = element || null;
            if (tutorialSpotlightElement) {
                tutorialSpotlightElement.classList.add('tutorial-spotlight');
            }
        }

        function endGuidedGame() {
            tutorialActive = false;
            setTutorialSpotlight(null);
            tutorialCoach.hidden = true;
            startNewGame();
        }

        function showHelpNudge(message) {
            clearTimeout(tutorialNudgeTimer);
            tutorialCoach.hidden = false;
            tutorialCoachTitle.textContent = '👀';
            tutorialCoachBody.innerHTML = `<p>${message}</p>`;
            tutorialCoachActions.innerHTML = '';
            setTutorialSpotlight(helpBtn);
            tutorialNudgeTimer = setTimeout(() => {
                if (!tutorialActive) {
                    tutorialCoach.hidden = true;
                    setTutorialSpotlight(null);
                }
            }, 3000);
        }

        function showTemporaryCoachMessage(message) {
            clearTimeout(tutorialNudgeTimer);
            tutorialCoach.hidden = false;
            tutorialCoachTitle.textContent = '✅';
            tutorialCoachBody.innerHTML = `<p>${message}</p>`;
            tutorialCoachActions.innerHTML = '';
            setTutorialSpotlight(null);
            tutorialNudgeTimer = setTimeout(() => {
                if (!tutorialActive) {
                    tutorialCoach.hidden = true;
                }
            }, 3000);
        }

        function openDebugMenu() {
            if (!canOpenDebugMenu()) return;
            debugModal.classList.add('show');
            debugError.textContent = '';
            debugPasswordInput.value = '';
            if (debugAuthenticated) {
                showDebugContent();
            } else {
                debugLock.hidden = false;
                debugContent.hidden = true;
                setTimeout(() => debugPasswordInput.focus(), 0);
            }
        }

        function closeDebugMenu() {
            debugModal.classList.remove('show');
        }

        function canOpenDebugMenu() {
            // 占位：未来可在每日挑战、排行榜、公开分享等场景限制调试入口，保证公平性。
            return true;
        }

        async function unlockDebugMenu() {
            const hash = await md5(debugPasswordInput.value || '');
            if (hash !== debugPasswordHash) {
                debugError.textContent = '密码不对。';
                return;
            }
            debugAuthenticated = true;
            showDebugContent();
        }

        function showDebugContent() {
            debugLock.hidden = true;
            debugContent.hidden = false;
            refreshDebugInfo();
        }

        function refreshDebugInfo() {
            debugInfo.innerHTML = `
                <div class="debug-row"><span>当前答案</span><strong>${escapeHtml(targetChar || '-')}</strong></div>
                <div class="debug-row"><span>猜测次数</span><strong>${guessCount}</strong></div>
                <div class="debug-row"><span>提示次数</span><strong>${hintCount}</strong></div>
                <div class="debug-row wide"><span>最近提示</span><strong>${escapeHtml(lastHintDebugText || '暂无')}</strong></div>
                <div class="debug-row"><span>教学模式</span><strong>${tutorialActive ? escapeHtml(tutorialStage || 'active') : '否'}</strong></div>
            `;
        }

        async function md5(value) {
            function add32(a, b) { return (a + b) & 0xffffffff; }
            function cmn(q, a, b, x, s, t) { return add32(((add32(add32(a, q), add32(x, t)) << s) | (add32(add32(a, q), add32(x, t)) >>> (32 - s))), b); }
            function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
            function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
            function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
            function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
            function md5cycle(x, k) {
                let [a, b, c, d] = x;
                a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586); c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
                a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426); c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
                a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417); c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
                a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101); c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
                a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632); c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
                a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083); c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
                a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690); c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
                a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784); c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
                a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463); c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
                a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353); c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
                a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222); c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
                a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835); c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
                a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415); c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
                a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606); c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
                a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744); c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
                a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379); c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
                x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
            }
            function md5blk(s) {
                const blocks = [];
                for (let i = 0; i < 64; i += 4) blocks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
                return blocks;
            }
            function rhex(n) {
                let s = '';
                for (let j = 0; j < 4; j++) s += ((n >> (j * 8 + 4)) & 0x0f).toString(16) + ((n >> (j * 8)) & 0x0f).toString(16);
                return s;
            }
            let str = unescape(encodeURIComponent(value));
            const state = [1732584193, -271733879, -1732584194, 271733878];
            let i;
            for (i = 64; i <= str.length; i += 64) md5cycle(state, md5blk(str.substring(i - 64, i)));
            str = str.substring(i - 64);
            const tail = new Array(16).fill(0);
            for (i = 0; i < str.length; i++) tail[i >> 2] |= str.charCodeAt(i) << ((i % 4) << 3);
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) { md5cycle(state, tail); tail.fill(0); }
            tail[14] = value.length * 8;
            md5cycle(state, tail);
            return state.map(rhex).join('');
        }

        function handleFooterVersionClick(event) {
            const footer = event.target.closest('#edgeBuildFooter');
            if (!footer) return;
            clearTimeout(debugFooterClickTimer);
            debugFooterClickCount++;
            if (debugFooterClickCount >= 10) {
                debugFooterClickCount = 0;
                footer.classList.add('debug-footer-flash');
                setTimeout(() => footer.classList.remove('debug-footer-flash'), 3000);
                return;
            }
            debugFooterClickTimer = setTimeout(() => {
                debugFooterClickCount = 0;
            }, 2500);
        }

        function endRoundFromDebug() {
            closeDebugMenu();
            if (gameWon) {
                startNewGame();
            } else {
                handleGiveUp();
            }
        }

        function handleLosePlayAgain() {
            loseModal.classList.remove('show');
            if (tutorialAwaitingPlayAgainExit) {
                tutorialActive = false;
                tutorialStage = '';
                tutorialAwaitingPlayAgainExit = false;
                setTutorialSpotlight(null);
                startNewGame();
                showTemporaryCoachMessage('你已经学会了，开始吧');
                return;
            }
            startNewGame();
        }

        function startDebugTargetRound() {
            const value = debugTargetInput.value.trim();
            if (!value || value.length !== 1) {
                debugError.textContent = '请输入一个汉字。';
                return;
            }
            closeDebugMenu();
            tutorialActive = false;
            tutorialStage = '';
            tutorialCoach.hidden = true;
            setTutorialSpotlight(null);
            startNewGame(value);
        }

        function createTutorialButton(text, onClick, variant = '') {
            const button = document.createElement('button');
            button.className = variant === 'secondary' ? 'tutorial-btn secondary' : 'tutorial-btn';
            button.textContent = text;
            button.addEventListener('click', onClick);
            return button;
        }

        let loadingTimeoutTimer = null;
        const loadingTimeoutWarning = document.getElementById('loadingTimeoutWarning');
        const FONT_DEFAULT_SIZE_KB = 20905; // 默认字体大小（KB），用于无法获取content-length时估算进度

        function showLoading(message) {
            loadingMessage.textContent = message;
            loadingProgressBar.classList.add('indeterminate');
            loadingOverlay.classList.remove('hidden');
            
            // 60秒后显示超时提示
            clearTimeout(loadingTimeoutTimer);
            loadingTimeoutTimer = setTimeout(() => {
                if (loadingTimeoutWarning) {
                    loadingTimeoutWarning.innerHTML = (window.t && window.t('loading_timeout_warning')) || 
                        "加载时间较长？尝试<a href='javascript:location.reload()'>刷新页面</a>或<a href='https://github.com/biliyoyo520/CNWordle/issues' target='_blank' rel='noopener'>反馈问题</a>";
                    loadingTimeoutWarning.style.display = 'block';
                }
            }, 60000);
        }

        function updateLoadingProgress(percent, message) {
            loadingMessage.textContent = message || loadingMessage.textContent;
            loadingProgressBar.classList.remove('indeterminate');
            loadingProgressBar.style.width = `${percent}%`;
        }

        function hideLoading() {
            clearTimeout(loadingTimeoutTimer);
            if (loadingTimeoutWarning) loadingTimeoutWarning.style.display = 'none';
            updateLoadingProgress(100, (window.t && window.t('loading_complete')) || '加载完成!');
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 300);
        }

        function showLoadingError(message) {
            loadingMessage.textContent = message;
            loadingProgressBar.style.backgroundColor = 'var(--color-present)';
            loadingProgressBar.classList.remove('indeterminate');
            loadingProgressBar.style.width = '100%';
        }

        function initHistoryGrid() {
            historyGrid.innerHTML = '';
            for (let i = 0; i < 15; i++) {
                const tile = document.createElement('div');
                tile.className = 'history-tile empty';
                tile.dataset.index = i;
                historyGrid.appendChild(tile);
            }
        }

        // ==================== 字体缓存 (IndexedDB) ====================
        const FONT_CACHE_DB = 'CNWordleFontCache';
        const FONT_CACHE_STORE = 'fonts';
        const FONT_CACHE_KEY = 'mainFont';
        const FONT_CACHE_VERSION = 1;

        function openFontCacheDB() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(FONT_CACHE_DB, FONT_CACHE_VERSION);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(FONT_CACHE_STORE)) {
                        db.createObjectStore(FONT_CACHE_STORE);
                    }
                };
            });
        }

        async function getCachedFont() {
            try {
                const db = await openFontCacheDB();
                return new Promise((resolve, reject) => {
                    const tx = db.transaction(FONT_CACHE_STORE, 'readonly');
                    const store = tx.objectStore(FONT_CACHE_STORE);
                    const request = store.get(FONT_CACHE_KEY);
                    request.onerror = () => reject(request.error);
                    request.onsuccess = () => resolve(request.result);
                });
            } catch (e) {
                console.warn('读取字体缓存失败:', e);
                return null;
            }
        }

        async function setCachedFont(arrayBuffer) {
            try {
                const db = await openFontCacheDB();
                return new Promise((resolve, reject) => {
                    const tx = db.transaction(FONT_CACHE_STORE, 'readwrite');
                    const store = tx.objectStore(FONT_CACHE_STORE);
                    const request = store.put(arrayBuffer, FONT_CACHE_KEY);
                    request.onerror = () => reject(request.error);
                    request.onsuccess = () => resolve();
                });
            } catch (e) {
                console.warn('保存字体缓存失败:', e);
            }
        }

        // ==================== 字体加载 ====================
        async function loadFont() {
            // 先尝试从缓存加载
            updateLoadingProgress(5, (window.t && window.t('checking_cache')) || '正在检查缓存...');
            const cachedData = await getCachedFont();
            if (cachedData) {
                try {
                    updateLoadingProgress(50, (window.t && window.t('loading_cached_font')) || '正在加载缓存字体...');
                    try {
                        const fonts = opentype.parseCollection(cachedData);
                        currentFont = fonts[0];
                    } catch (e) {
                        currentFont = opentype.parse(cachedData);
                    }
                    console.log('从缓存加载字体成功');
                    return true;
                } catch (e) {
                    console.warn('缓存字体解析失败，重新下载:', e);
                }
            }

            // 缓存不存在或无效，从网络加载
            const presetFonts = [
                'http://res-aliyun.yoyo250.fun/files/NotoSerifCJKsc-ExtraLight.otf',
                'https://magenta-accessible-gibbon-63.mypinata.cloud/ipfs/bafybeignufq4erz4kdagtwi3vxu2k47fjhnfv6c6cyfhxugii72ikbzcua',
                'fonts/NotoSerifCJKsc-ExtraLight.otf',
            ];

            for (let i = 0; i < presetFonts.length; i++) {
                const fontPath = presetFonts[i];
                try {
                    updateLoadingProgress(10 + i * 20, `${(window.t && window.t('loading_font')) || '正在加载字体'} (${i + 1}/${presetFonts.length})...`);
                    
                    const response = await fetch(fontPath);
                    if (!response.ok) continue;

                    // 如果支持进度，显示下载进度
                    const contentLength = response.headers.get('content-length');
                    if (contentLength) {
                        const total = parseInt(contentLength, 10);
                        const reader = response.body.getReader();
                        let received = 0;
                        const chunks = [];
                        
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            chunks.push(value);
                            received += value.length;
                            const percent = Math.round((received / total) * 70) + 20;
                            updateLoadingProgress(percent, `${(window.t && window.t('downloading_font')) || '正在下载字体...'} ${Math.round(received / 1024)}KB / ${Math.round(total / 1024)}KB`);
                        }
                        
                        const arrayBuffer = new Uint8Array(received);
                        let position = 0;
                        for (const chunk of chunks) {
                            arrayBuffer.set(chunk, position);
                            position += chunk.length;
                        }
                        
                        updateLoadingProgress(90, (window.t && window.t('parsing_font')) || '正在解析字体...');
                        
                        try {
                            const fonts = opentype.parseCollection(arrayBuffer.buffer);
                            currentFont = fonts[0];
                        } catch (e) {
                            currentFont = opentype.parse(arrayBuffer.buffer);
                        }
                        
                        // 保存到缓存
                        await setCachedFont(arrayBuffer.buffer);
                        console.log('字体已缓存到 IndexedDB');
                    } else {
                        // 不支持进度（流传输），使用默认字体大小估算
                        const total = FONT_DEFAULT_SIZE_KB * 1024; // 转换为字节
                        const reader = response.body.getReader();
                        let received = 0;
                        const chunks = [];
                        
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            chunks.push(value);
                            received += value.length;
                            const percent = Math.min(Math.round((received / total) * 70) + 20, 89);
                            updateLoadingProgress(percent, `${(window.t && window.t('downloading_font')) || '正在下载字体...'} ${Math.round(received / 1024)}KB / ~${FONT_DEFAULT_SIZE_KB}KB`);
                        }
                        
                        const arrayBuffer = new Uint8Array(received);
                        let position = 0;
                        for (const chunk of chunks) {
                            arrayBuffer.set(chunk, position);
                            position += chunk.length;
                        }
                        
                        updateLoadingProgress(90, (window.t && window.t('parsing_font')) || '正在解析字体...');

                        try {
                            const fonts = opentype.parseCollection(arrayBuffer.buffer);
                            currentFont = fonts[0];
                        } catch (e) {
                            currentFont = opentype.parse(arrayBuffer.buffer);
                        }
                        
                        // 保存到缓存
                        await setCachedFont(arrayBuffer.buffer);
                        console.log('字体已缓存到 IndexedDB');
                    }

                    console.log('字体加载成功:', fontPath);
                    return true;
                } catch (e) {
                    console.log('尝试加载字体失败:', fontPath);
                }
            }
            return false;
        }

        // ==================== 游戏逻辑 ====================
        function startNewGame(forcedTarget = '') {
            if (typeof forcedTarget !== 'string') {
                forcedTarget = '';
            }
            targetChar = forcedTarget || commonChars[Math.floor(Math.random() * commonChars.length)];
            guessCount = 0;
            gameWon = false;
            guessHistory = [];
            hintTextShown = false;
            hintTextType = '';
            hintMeaningValue = '';
            revealedHintIndices = [];
            hintCount = 0;
            updateGuessCountDisplay(0);
            clearHintDisplay();
            guessInput.value = '';
            guessInput.classList.remove('has-svg');
            inputSvgOverlay.classList.remove('show');
            inputSvgOverlay.innerHTML = '';
            guessBtn.textContent = (window.t && window.t('btn_guess')) || '猜';
            guessBtn.onclick = null; // 重置按钮点击事件
            guessInput.disabled = false;
            winModal.classList.remove('show');
            loseModal.classList.remove('show');
            closeDetailPanel();

            // 预计算目标字路径
            targetPaths = extractClosedPaths(currentFont, targetChar, 200, 8);
            targetNestingLevels = determineNestingLevelsLocal(targetPaths);
            updateHintButtonState();

            // 重置历史格子
            initHistoryGrid();

            guessInput.focus();
            console.log('新游戏开始，目标字:', targetChar);
        }

        function handleGuess() {
            if (gameWon) return;
            
            clearAutoGuessTimer();

            const guess = guessInput.value.trim();
            if (!guess || guess.length !== 1) return;
            // 调试菜单入口暂时关闭，保留菜单逻辑以后再接回。
            // if (guess === '~') {
            //     guessInput.value = '';
            //     openDebugMenu();
            //     return;
            // }

            guessCount++;
            updateGuessCountDisplay(guessCount);

            // 提取猜测字的路径并计算相似度
            const guessPaths = extractClosedPaths(currentFont, guess, 200, 8);
            const guessNestingLevels = determineNestingLevelsLocal(guessPaths);

            // 使用形状+语义比较计算相似度
            const { matchScores } = compareGlyphPaths(
                targetPaths.filter((_, i) => targetNestingLevels[i] % 2 === 0),
                guessPaths.filter((_, i) => guessNestingLevels[i] % 2 === 0),
                targetChar,
                guess
            );

            // 构建猜测数据
            const guessData = {
                char: guess,
                paths: guessPaths,
                nestingLevels: guessNestingLevels,
                matchScores: matchScores,
                isCorrect: guess === targetChar
            };

            // 添加到历史
            guessHistory.unshift(guessData);
            if (guessHistory.length > 15) {
                guessHistory.pop();
            }

            // 更新历史格子
            updateHistoryGrid();

            // 显示SVG覆盖（包含倒计时）
            const isCorrectGuess = guess === targetChar;
            showInputSvgOverlay(guessPaths, guessNestingLevels, matchScores, isCorrectGuess);

            if (isCorrectGuess) {
                gameWon = true;
                clearCountdown(); // 猜对了不需要倒计时
                // 更新按钮文本为"再来"
                guessBtn.textContent = (window.t && window.t('btn_restart_win')) || '再来';
                guessBtn.onclick = startNewGame;
                updateHintButtonState();
                if (!tutorialActive) {
                    setTimeout(showWinModal, 1500);
                }
            }
            handleTutorialGuess(guess);
        }

        function clearHintDisplay() {
            hintDisplay.innerHTML = '';
            hintDisplay.hidden = true;
        }

        function getVisibleTargetPathIndices() {
            return targetPaths
                .map((_, index) => index)
                .filter(index => targetNestingLevels[index] % 2 === 0);
        }

        function updateHintButtonState() {
            if (!hintBtn) return;
            hintBtn.disabled = gameWon || isShowingResult || !targetPaths.length;
        }

        function handleHint() {
            if (gameWon || isShowingResult) return;
            clearAutoGuessTimer();
            hintCount++;
            const tutorialWasWaitingForHint = tutorialActive && tutorialStage === 'clickHint';

            const availableHintTypes = ['shape'];
            if (charHints[targetChar]) {
                availableHintTypes.push('pinyin', 'meaning');
            }

            hintTextType = tutorialWasWaitingForHint ? 'shape' : availableHintTypes[Math.floor(Math.random() * availableHintTypes.length)];
            hintTextShown = hintTextType !== 'shape';
            hintMeaningValue = '';

            if (hintTextType === 'pinyin' || hintTextType === 'meaning') {
                renderTextHint();
                updateHintButtonState();
                guessInput.focus();
                if (tutorialWasWaitingForHint) {
                    handleTutorialHintClick();
                }
                return;
            }

            const remaining = getVisibleTargetPathIndices().filter(index => !revealedHintIndices.includes(index));
            if (!remaining.length) {
                revealedHintIndices = [];
                remaining.push(...getVisibleTargetPathIndices());
            }
            if (!remaining.length) {
                updateHintButtonState();
                return;
            }

            const nextIndex = remaining[Math.floor(Math.random() * remaining.length)];
            revealedHintIndices.push(nextIndex);
            lastTutorialHintPart = tutorialWasWaitingForHint ? classifyTutorialHintPart(nextIndex) : '';
            renderShapeHint(nextIndex);
            updateHintButtonState();
            guessInput.focus();
            if (tutorialWasWaitingForHint) {
                handleTutorialHintClick();
            }
        }

        function renderTextHint() {
            const hint = charHints[targetChar];
            hintDisplay.innerHTML = '';
            hintDisplay.hidden = false;

            const text = document.createElement('div');
            text.className = 'hint-text';
            if (hint) {
                const lang = (window.getCurrentLanguage && window.getCurrentLanguage()) || 'zh_cn';
                const pinyinLabel = lang === 'zh_cn' ? '读音' : 'Pinyin';
                const meaningLabel = lang === 'zh_cn' ? '释义' : 'Meaning';
                if (hintTextType === 'pinyin') {
                    lastHintDebugText = `${pinyinLabel}: ${hint.pinyin}`;
                    text.innerHTML = `<strong>${pinyinLabel}</strong><span>${escapeHtml(hint.pinyin)}</span>`;
                } else {
                    if (!hintMeaningValue) {
                        hintMeaningValue = pickMeaning(hint.meaning || hint.meaningEn || '');
                    }
                    lastHintDebugText = `${meaningLabel}: ${hintMeaningValue}`;
                    text.innerHTML = `<strong>${meaningLabel}</strong><span>${escapeHtml(hintMeaningValue)}</span>`;
                }
            } else {
                lastHintDebugText = '暂无读音/字义数据';
                text.textContent = ((window.getCurrentLanguage && window.getCurrentLanguage()) === 'en_us')
                    ? 'No pronunciation or meaning data. The next hint will reveal a glyph part.'
                    : '暂无读音/字义数据，下一次提示会给出字形分块。';
            }
            hintDisplay.appendChild(text);
        }

        function pickMeaning(value) {
            const parts = String(value)
                .split('/')
                .map(part => part.trim())
                .filter(Boolean);
            if (!parts.length) return value;
            return parts[Math.floor(Math.random() * parts.length)];
        }

        function renderShapeHint(pathIndex) {
            hintDisplay.innerHTML = '';
            hintDisplay.hidden = false;
            lastHintDebugText = `字形分块 #${pathIndex}${lastTutorialHintPart ? ` (${lastTutorialHintPart})` : ''}`;

            const piece = document.createElement('div');
            piece.className = 'hint-piece';
            piece.appendChild(createNestedHintSvg(pathIndex, 52));
            hintDisplay.appendChild(piece);
        }

        function classifyTutorialHintPart(pathIndex) {
            const visiblePaths = getVisibleTargetPathIndices().map(index => targetPaths[index]);
            const allPoints = visiblePaths.flatMap(path => path.points || []);
            const glyphBounds = getPathBoundsLocal(allPoints);
            const pathBounds = targetPaths[pathIndex].bounds;
            if (!glyphBounds || !pathBounds) return 'door';

            const glyphWidth = glyphBounds.maxX - glyphBounds.minX || 1;
            const glyphHeight = glyphBounds.maxY - glyphBounds.minY || 1;
            const centerX = ((pathBounds.minX + pathBounds.maxX) / 2 - glyphBounds.minX) / glyphWidth;
            const centerY = ((pathBounds.minY + pathBounds.maxY) / 2 - glyphBounds.minY) / glyphHeight;
            const widthRatio = (pathBounds.maxX - pathBounds.minX) / glyphWidth;
            const heightRatio = (pathBounds.maxY - pathBounds.minY) / glyphHeight;
            const areaRatio = widthRatio * heightRatio;

            if (areaRatio < 0.025 || (widthRatio < 0.18 && heightRatio < 0.18)) return 'dot';
            if (centerY < 0.25 && widthRatio > 0.2) return 'grass';
            if (centerX < 0.34) return 'li';
            return 'door';
        }

        function createNestedHintSvg(pathIndex, displaySize = 52) {
            const padding = 8;
            const rootPath = targetPaths[pathIndex];
            const rootLevel = targetNestingLevels[pathIndex];
            const bounds = rootPath.bounds || { minX: 0, minY: 0, maxX: 100, maxY: 100 };
            const width = (bounds.maxX - bounds.minX) + padding * 2;
            const height = (bounds.maxY - bounds.minY) + padding * 2;

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', displaySize);
            svg.setAttribute('height', displaySize);
            svg.setAttribute('viewBox', `${bounds.minX - padding} ${bounds.minY - padding} ${width} ${height}`);

            const includedIndices = targetPaths
                .map((path, index) => ({ path, index }))
                .filter(({ path, index }) => index === pathIndex || (
                    targetNestingLevels[index] > rootLevel &&
                    isPathContainedByLocal(path.points, rootPath.points)
                ))
                .map(({ index }) => index)
                .sort((a, b) => targetNestingLevels[a] - targetNestingLevels[b]);

            includedIndices.forEach(index => {
                const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const relativeLevel = targetNestingLevels[index] - rootLevel;
                pathElement.setAttribute('d', targetPaths[index].pathString);
                pathElement.setAttribute('fill', relativeLevel % 2 === 0 ? 'var(--color-present)' : 'var(--color-bg-secondary)');
                pathElement.setAttribute('stroke', 'var(--color-text)');
                pathElement.setAttribute('stroke-width', '1');
                svg.appendChild(pathElement);
            });

            return svg;
        }

        function escapeHtml(value) {
            return String(value).replace(/[&<>"']/g, char => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            })[char]);
        }

        function showInputSvgOverlay(paths, nestingLevels, matchScores, isCorrect = false) {
            const pathColors = buildPathColors(paths, nestingLevels, matchScores);
            const svg = createFullGlyphSvg(paths, nestingLevels, pathColors, 70);
            
            inputSvgOverlay.innerHTML = '';
            inputSvgOverlay.appendChild(svg);
            inputSvgOverlay.classList.add('show');
            guessInput.classList.add('has-svg');
            isShowingResult = true;
            updateHintButtonState();
            
            // 猜对时只变边框为绿色，背景保持黑/白
            if (isCorrect) {
                inputSvgOverlay.classList.add('correct');
            } else {
                inputSvgOverlay.classList.remove('correct');
            }
            
            // 开始倒计时
            startCountdown();
            
            // 保持输入框焦点，不禁用它（但仅当手写板未打开时）
            if (!handwriteModal.classList.contains('show')) {
                guessInput.focus();
            }
        }

        function hideInputSvgOverlay() {
            inputSvgOverlay.classList.remove('show');
            inputSvgOverlay.classList.remove('correct');
            guessInput.classList.remove('has-svg');
            guessInput.value = '';
            isShowingResult = false;
            clearCountdown();
            guessBtn.textContent = (window.t && window.t('btn_guess')) || '猜';
            updateHintButtonState();
            // 仅当手写板未打开时才聚焦输入框，避免移动端弹出软键盘
            if (!handwriteModal.classList.contains('show')) {
                guessInput.focus();
            }
        }

        function startCountdown() {
            countdownValue = 3;
            updateCountdownDisplay();
            clearCountdown();
            countdownTimer = setInterval(() => {
                countdownValue--;
                if (countdownValue <= 0) {
                    clearCountdown();
                    hideInputSvgOverlay();
                } else {
                    updateCountdownDisplay();
                }
            }, 1000);
        }

        function clearCountdown() {
            if (countdownTimer) {
                clearInterval(countdownTimer);
                countdownTimer = null;
            }
        }

        function updateCountdownDisplay() {
            const continueText = (window.t && window.t('btn_continue')) || '继续';
            guessBtn.textContent = `${continueText}(${countdownValue})`;
        }

        function buildPathColors(paths, nestingLevels, matchScores) {
            const pathColors = [];
            let visibleIndex = 0;
            paths.forEach((_, index) => {
                if (nestingLevels[index] % 2 === 0) {
                    const score = matchScores[visibleIndex] || 0;
                    const level = getMatchLevel(score);
                    pathColors[index] = {
                        color: getMatchColor(level, score),
                        score: score,
                        level: level
                    };
                    visibleIndex++;
                } else {
                    pathColors[index] = { color: 'var(--color-bg)', score: null, level: null };
                }
            });
            return pathColors;
        }

        function updateHistoryGrid() {
            const tiles = historyGrid.querySelectorAll('.history-tile');
            tiles.forEach((tile, i) => {
                tile.innerHTML = '';
                tile.className = 'history-tile';
                
                if (i < guessHistory.length) {
                    const data = guessHistory[i];
                    const pathColors = buildPathColors(data.paths, data.nestingLevels, data.matchScores);
                    const svg = createFullGlyphSvg(data.paths, data.nestingLevels, pathColors, 50);
                    tile.appendChild(svg);
                    
                    if (data.isCorrect) {
                        tile.classList.add('correct');
                    } else if (!commonChars.includes(data.char)) {
                        tile.classList.add('not-in-list');
                    }

                    tile.onclick = () => {
                        openDetailPanel(data);
                        handleTutorialHistoryClick();
                    };
                } else {
                    tile.classList.add('empty');
                    tile.onclick = null;
                }
            });
        }

        // ==================== 详情面板 ====================
        function openDetailPanel(data) {
            currentDetailData = data; // 保存当前数据用于刷新
            // 构建SVG，给每个路径添加ID
            const pathColors = buildPathColors(data.paths, data.nestingLevels, data.matchScores);
            const svg = createFullGlyphSvgWithIds(data.paths, data.nestingLevels, pathColors, 120);
            detailGlyph.innerHTML = '';
            detailGlyph.appendChild(svg);

            // 构建相似度列表
            detailSimilarity.innerHTML = '';
            let visibleIndex = 0;
            data.paths.forEach((_, index) => {
                if (data.nestingLevels[index] % 2 !== 0) return;

                const { color, score, level } = pathColors[index];
                const item = document.createElement('div');
                item.className = 'similarity-item';
                item.dataset.pathIndex = index;
                item.innerHTML = `
                    <div class="similarity-color ${level}" style="background-color: ${color}"></div>
                    <span class="similarity-value ${level}">${Math.round(score)}%</span>
                `;
                
                // 点击高亮对应路径
                item.addEventListener('click', () => {
                    highlightPath(svg, index);
                    handleTutorialSimilarityClick(item);
                });
                
                detailSimilarity.appendChild(item);
                visibleIndex++;
            });

            // 显示面板
            detailPanel.classList.add('open');
            overlay.classList.add('show');
            if (window.innerWidth >= 769) {
                appContainer.classList.add('sidebar-open');
            }
            
            // 显示/隐藏不在列表警告
            if (!commonChars.includes(data.char)) {
                detailWarning.classList.add('show');
            } else {
                detailWarning.classList.remove('show');
            }
        }

        function highlightPath(svg, pathIndex) {
            // 移除所有高亮
            svg.querySelectorAll('path').forEach(p => {
                p.classList.remove('highlighted');
                p.style.strokeWidth = '0.5';
                p.style.stroke = 'var(--color-border-dark)';
            });
            
            // 高亮选中的路径
            const targetPath = svg.querySelector(`path[data-index="${pathIndex}"]`);
            if (targetPath) {
                targetPath.classList.add('highlighted');
                targetPath.style.strokeWidth = '3';
                targetPath.style.stroke = '#ff0000';
            }
        }

        function closeDetailPanel() {
            detailPanel.classList.remove('open');
            overlay.classList.remove('show');
            appContainer.classList.remove('sidebar-open');
        }

        // ==================== 汉字列表浮窗 ====================
        function toggleCharListModal() {
            // 如果已经打开就关闭
            if (charListModal.classList.contains('show')) {
                closeCharListModal();
                return;
            }
            
            // 关闭其他可能打开的弹窗
            closeAllModals();
            
            // 渲染汉字列表
            renderCharList();
            
            // 显示浮窗
            charListModal.classList.add('show');
        }

        function closeCharListModal() {
            charListModal.classList.remove('show');
        }

        function closeAllModals() {
            // 关闭所有浮窗（不包括详情面板）
            winModal.classList.remove('show');
            loseModal.classList.remove('show');
            helpModal.classList.remove('show');
            charListModal.classList.remove('show');
            handwriteModal.classList.remove('show');
        }

        function renderCharList() {
            charListGrid.innerHTML = '';
            commonChars.split('').forEach(char => {
                const tile = document.createElement('div');
                tile.className = 'charlist-tile';
                // 创建SVG显示汉字
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('viewBox', '0 0 1000 1000');
                const glyph = currentFont.charToGlyph(char);
                if (glyph && glyph.path) {
                    const pathData = glyph.path.toPathData();
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    // 翻转路径
                    path.setAttribute('d', pathData);
                    path.setAttribute('transform', 'scale(1, -1) translate(0, -800)');
                    path.setAttribute('fill', 'currentColor');
                    svg.appendChild(path);
                }
                tile.appendChild(svg);
                charListGrid.appendChild(tile);
            });
        }

        // ==================== 弹窗 ====================
        function showWinModal() {
            modalTarget.textContent = targetChar;
            renderWinMessage();
            winModal.classList.add('show');
        }

        function renderWinMessage() {
            const message = (window.t && window.t('win_message', guessCount, hintCount)) ||
                `你用了 <strong id="modalGuessCount">${guessCount}</strong> 次猜测找到了答案！<br>提示了 <strong id="modalHintCount">${hintCount}</strong> 次`;
            winModalMessage.innerHTML = message;
        }

        function showLoseModal() {
            loseModalTarget.textContent = targetChar;
            renderLoseMessage();
            loseModal.classList.add('show');
        }

        function renderLoseMessage() {
            const message = (window.t && window.t('lose_message', guessCount, hintCount)) ||
                `答案是上面这个字，你猜了 <strong id="loseModalGuessCount">${guessCount}</strong> 次<br>提示了 <strong id="loseModalHintCount">${hintCount}</strong> 次`;
            loseModalMessage.innerHTML = message;
        }

        function handleGiveUp() {
            if (gameWon) return;
            clearAutoGuessTimer();
            clearCountdown();
            if (tutorialActive) {
                if (tutorialStage === 'surrender') {
                    handleTutorialSurrender();
                } else {
                    tutorialActive = false;
                    tutorialStage = '';
                    tutorialCoach.hidden = true;
                    setTutorialSpotlight(null);
                    closeTutorial();
                    startNewGame();
                    showHelpNudge('你不乖哦，乖了再来找我');
                    return;
                }
            }
            handleTutorialSurrender();
            
            // 更新显示为答案
            guessCountContainer.innerHTML = `答案是「<span class="answer-char">${targetChar}</span>」<br>你猜了${guessCount}次<br>提示了${hintCount}次`;
            
            // 更新按钮文本为"不服"
            guessBtn.textContent = (window.t && window.t('btn_restart_lose')) || '不服';
            guessBtn.onclick = startNewGame;
            updateHintButtonState();
            
            showLoseModal();
        }

        // ==================== 事件监听 ====================
        function setupEventListeners() {
            guessBtn.addEventListener('click', () => {
                if (isShowingResult) {
                    hideInputSvgOverlay();
                } else {
                    handleGuess();
                }
                guessInput.focus();
            });

            // 回车键全局监听，无论输入框是否禁用都响应
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    // 忽略弹窗打开时的回车
                    if (helpModal.classList.contains('show') || 
                        winModal.classList.contains('show') ||
                        loseModal.classList.contains('show')) {
                        return;
                    }
                    e.preventDefault();
                    if (isShowingResult) {
                        // 继续状态：跳过3秒等待，直接开始下一次
                        hideInputSvgOverlay();
                    } else {
                        handleGuess();
                    }
                }
            });

            guessInput.addEventListener('input', () => {
                // 如果在显示结果状态，任何输入都触发「继续」
                if (isShowingResult) {
                    const newChar = guessInput.value.slice(-1); // 取最后一个字符
                    hideInputSvgOverlay();
                    guessInput.value = newChar; // 保留新输入的字符
                    // 重新开始3秒计时器
                    resetAutoGuessTimer();
                    return;
                }
                if (guessInput.value.length > 1) {
                    guessInput.value = guessInput.value[guessInput.value.length - 1];
                }
                resetAutoGuessTimer();
            });

            detailCloseBtn.addEventListener('click', closeDetailPanel);
            overlay.addEventListener('click', closeDetailPanel);

            // 汉字列表浮窗
            detailWarning.addEventListener('click', toggleCharListModal);
            dictBtn.addEventListener('click', () => {
                toggleCharListModal();
                handleTutorialDictionaryClick();
            });
            charListCloseBtn.addEventListener('click', closeCharListModal);
            charListModal.addEventListener('click', (e) => {
                if (e.target === charListModal) {
                    closeCharListModal();
                }
            });

            playAgainBtn.addEventListener('click', startNewGame);
            modalCloseBtn.addEventListener('click', () => winModal.classList.remove('show'));

            // 提示/认输按钮
            hintBtn.addEventListener('click', handleHint);
            giveUpBtn.addEventListener('click', handleGiveUp);
            losePlayAgainBtn.addEventListener('click', handleLosePlayAgain);
            loseModalCloseBtn.addEventListener('click', () => loseModal.classList.remove('show'));

            debugCloseBtn.addEventListener('click', closeDebugMenu);
            debugUnlockBtn.addEventListener('click', unlockDebugMenu);
            debugPasswordInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') unlockDebugMenu();
            });
            debugEndRoundBtn.addEventListener('click', endRoundFromDebug);
            debugSetTargetBtn.addEventListener('click', startDebugTargetRound);
            debugModal.addEventListener('click', (e) => {
                if (e.target === debugModal) closeDebugMenu();
            });
            // 版本号连点入口暂时关闭，保留 handleFooterVersionClick 以后再接回。
            // document.addEventListener('click', handleFooterVersionClick);

            // 帮助按钮
            helpBtn.addEventListener('click', () => {
                helpGotItBtn.textContent = (window.t && window.t('btn_got_it')) || '我知道了';
                helpModal.classList.add('show');
            });
            helpCloseBtn.addEventListener('click', () => {
                closeFirstTimeHelp();
            });
            helpGotItBtn.addEventListener('click', () => {
                closeFirstTimeHelp();
            });
            helpConfusedBtn.addEventListener('click', openTutorial);
            helpModal.addEventListener('click', (e) => {
                if (e.target === helpModal) {
                    closeFirstTimeHelp();
                }
            });
            tutorialCloseBtn.addEventListener('click', closeTutorial);
            tutorialModal.addEventListener('click', (e) => {
                if (e.target === tutorialModal) {
                    closeTutorial();
                }
            });

            // 主题切换：跟随系统 -> 反向 -> 跟随系统
            themeBtn.addEventListener('click', () => {
                themeState = (themeState + 1) % 3;
                applyTheme();
            });

            // 色盲模式切换
            colorBlindBtn.addEventListener('click', () => {
                colorBlindMode = !colorBlindMode;
                localStorage.setItem('colorBlindMode', colorBlindMode);
                applyColorBlindMode();
                // 刷新历史显示以应用新颜色
                updateHistoryGrid();
                if (isShowingResult && guessHistory.length > 0) {
                    const lastGuess = guessHistory[0];
                    showInputSvgOverlay(lastGuess.paths, lastGuess.nestingLevels, lastGuess.matchScores, lastGuess.isCorrect);
                }
                // 刷新详情面板
                if (currentDetailData && detailPanel.classList.contains('open')) {
                    openDetailPanel(currentDetailData);
                }
            });

            // 初始化色盲模式
            applyColorBlindMode();

            // 监听系统主题变化
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                systemPrefersDark = e.matches;
                if (themeState === 0) {
                    applyTheme();
                }
            });
        }

        function applyTheme() {
            document.body.classList.remove('dark-mode', 'light-mode');
            
            // 更新图标显示
            iconAuto.classList.remove('active');
            iconLight.classList.remove('active');
            iconDark.classList.remove('active');
            
            if (themeState === 0) {
                // 跟随系统
                iconAuto.classList.add('active');
                if (systemPrefersDark) {
                    document.body.classList.add('dark-mode');
                }
            } else if (themeState === 1) {
                // 第一次点击：切换到与系统相反的主题
                if (systemPrefersDark) {
                    document.body.classList.add('light-mode');
                    iconLight.classList.add('active');
                } else {
                    document.body.classList.add('dark-mode');
                    iconDark.classList.add('active');
                }
            } else if (themeState === 2) {
                // 第二次点击：切换到与系统相同的主题（手动设置）
                if (systemPrefersDark) {
                    document.body.classList.add('dark-mode');
                    iconDark.classList.add('active');
                } else {
                    document.body.classList.add('light-mode');
                    iconLight.classList.add('active');
                }
            }
        }

        function applyColorBlindMode() {
            if (colorBlindMode) {
                document.body.classList.add('color-blind-mode');
                colorBlindBtn.classList.add('active');
            } else {
                document.body.classList.remove('color-blind-mode');
                colorBlindBtn.classList.remove('active');
            }
        }

        // ==================== 自动猜测计时器 ====================
        function resetAutoGuessTimer() {
            clearAutoGuessTimer();
            if (guessInput.value.trim().length === 1) {
                autoGuessTimer = setTimeout(() => {
                    if (!gameWon && guessInput.value.trim().length === 1) {
                        handleGuess();
                    }
                }, 3000);
            }
        }

        function clearAutoGuessTimer() {
            if (autoGuessTimer) {
                clearTimeout(autoGuessTimer);
                autoGuessTimer = null;
            }
        }

        // ==================== 路径处理函数 ====================
        function parseSubPathCommands(commands) {
            const subPaths = [];
            let currentCommands = [];
            let startPoint = null;
            let currentPoint = null;

            for (const cmd of commands) {
                switch (cmd.type) {
                    case 'M':
                        if (currentCommands.length > 0) {
                            subPaths.push({ commands: currentCommands, startPoint, endPoint: currentPoint });
                        }
                        currentCommands = [cmd];
                        startPoint = { x: cmd.x, y: cmd.y };
                        currentPoint = { x: cmd.x, y: cmd.y };
                        break;
                    case 'L':
                    case 'C':
                    case 'Q':
                        currentCommands.push(cmd);
                        currentPoint = { x: cmd.x, y: cmd.y };
                        break;
                    case 'Z':
                        currentCommands.push(cmd);
                        subPaths.push({ commands: currentCommands, startPoint, endPoint: startPoint, closed: true });
                        currentCommands = [];
                        currentPoint = startPoint;
                        break;
                }
            }
            if (currentCommands.length > 0) {
                subPaths.push({ commands: currentCommands, startPoint, endPoint: currentPoint });
            }
            return subPaths;
        }

        function commandsToPathString(commands) {
            let d = '';
            for (const cmd of commands) {
                switch (cmd.type) {
                    case 'M': d += `M${cmd.x} ${cmd.y}`; break;
                    case 'L': d += `L${cmd.x} ${cmd.y}`; break;
                    case 'C': d += `C${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y}`; break;
                    case 'Q': d += `Q${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y}`; break;
                    case 'Z': d += 'Z'; break;
                }
            }
            return d;
        }

        function getPointsFromCommands(commands) {
            const points = [];
            for (const cmd of commands) {
                if (cmd.x !== undefined && cmd.y !== undefined) {
                    points.push({ x: cmd.x, y: cmd.y });
                }
            }
            return points;
        }

        function distance(p1, p2) {
            return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        }

        function connectAndSplitPaths(subPaths, gapThreshold) {
            if (gapThreshold <= 0) return subPaths;

            const result = [];
            const used = new Set();

            for (let i = 0; i < subPaths.length; i++) {
                if (subPaths[i].closed) continue;
                const pathA = subPaths[i];
                const selfDist = distance(pathA.startPoint, pathA.endPoint);
                if (selfDist < gapThreshold && selfDist > 0.1) {
                    result.push({
                        commands: [...pathA.commands, { type: 'Z' }],
                        startPoint: pathA.startPoint,
                        endPoint: pathA.startPoint,
                        closed: true
                    });
                    used.add(i);
                }
            }

            for (let i = 0; i < subPaths.length; i++) {
                if (!used.has(i)) result.push(subPaths[i]);
            }
            return result;
        }

        function extractClosedPaths(font, char, fontSize, gapThreshold) {
            const glyph = font.charToGlyph(char);
            const path = glyph.getPath(0, 0, fontSize);

            let subPaths = parseSubPathCommands(path.commands);
            subPaths = connectAndSplitPaths(subPaths, gapThreshold);

            const closedPaths = subPaths.filter(sp => sp.closed);

            // 计算整个字形的边界框
            const allPoints = closedPaths.flatMap(sp => getPointsFromCommands(sp.commands));
            const glyphBounds = getPathBoundsLocal(allPoints);
            const glyphWidth = glyphBounds ? (glyphBounds.maxX - glyphBounds.minX) : 1;
            const glyphHeight = glyphBounds ? (glyphBounds.maxY - glyphBounds.minY) : 1;
            const glyphArea = glyphWidth * glyphHeight || 1;

            return closedPaths.map(sp => {
                const points = getPointsFromCommands(sp.commands);
                const bounds = getPathBoundsLocal(points);
                const pathWidth = bounds ? (bounds.maxX - bounds.minX) : 0;
                const pathHeight = bounds ? (bounds.maxY - bounds.minY) : 0;
                const pathArea = pathWidth * pathHeight || 0;
                
                // 计算零件相对于整个字形的大小比例 (0-1)
                const relativeSize = pathArea / glyphArea;
                
                // 计算零件中心点相对于字形的位置 (0-1)
                const centerX = bounds ? ((bounds.minX + bounds.maxX) / 2 - glyphBounds.minX) / glyphWidth : 0.5;
                const centerY = bounds ? ((bounds.minY + bounds.maxY) / 2 - glyphBounds.minY) / glyphHeight : 0.5;
                
                return {
                    pathString: commandsToPathString(sp.commands),
                    points,
                    commands: sp.commands,
                    bounds,
                    normalizedPoints: normalizePoints(points, bounds),
                    relativeSize,  // 新增：相对大小
                    relativeCenter: { x: centerX, y: centerY }  // 新增：相对位置
                };
            });
        }

        function normalizePoints(points, bounds) {
            if (!bounds || points.length === 0) return [];
            const width = bounds.maxX - bounds.minX;
            const height = bounds.maxY - bounds.minY;
            const scale = Math.max(width, height) || 1;
            return points.map(p => ({
                x: (p.x - bounds.minX) / scale,
                y: (p.y - bounds.minY) / scale
            }));
        }

        function samplePoints(points, count) {
            if (points.length <= count) return points;
            const result = [];
            const step = points.length / count;
            for (let i = 0; i < count; i++) {
                result.push(points[Math.floor(i * step)]);
            }
            return result;
        }

        // 简单的形状相似度计算（Hausdorff距离）- 用于单部件比较
        function calculateShapeSimilarity(path1Points, path2Points) {
            if (path1Points.length === 0 || path2Points.length === 0) return 0;

            const sampleCount = 30;
            const sample1 = samplePoints(path1Points, sampleCount);
            const sample2 = samplePoints(path2Points, sampleCount);

            let totalDist1to2 = 0;
            for (const p1 of sample1) {
                let minDist = Infinity;
                for (const p2 of sample2) {
                    minDist = Math.min(minDist, Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2));
                }
                totalDist1to2 += minDist;
            }

            let totalDist2to1 = 0;
            for (const p2 of sample2) {
                let minDist = Infinity;
                for (const p1 of sample1) {
                    minDist = Math.min(minDist, Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2));
                }
                totalDist2to1 += minDist;
            }

            const avgDist = (totalDist1to2 + totalDist2to1) / (2 * sampleCount);
            return Math.exp(-avgDist * 6) * 100;
        }

        function compareGlyphPaths(targetPathsFiltered, sourcePathsFiltered, targetChar, guessChar) {
            const sourceCount = sourcePathsFiltered.length;
            const matchScores = new Array(sourceCount).fill(0);

            // 获取语义相似度（基于部首/部件分解）
            let semanticScore = 0;
            if (typeof calculateRadicalSimilarity === 'function' && targetChar && guessChar) {
                semanticScore = calculateRadicalSimilarity(targetChar, guessChar);
            }

            // 完全相同的字
            if (targetChar === guessChar) {
                return { matchScores: new Array(sourceCount).fill(100) };
            }

            // 形状比较逻辑
            for (let si = 0; si < sourceCount; si++) {
                let bestShapeScore = 0;
                for (let ti = 0; ti < targetPathsFiltered.length; ti++) {
                    const shapeSim = calculateShapeSimilarity(
                        targetPathsFiltered[ti].normalizedPoints,
                        sourcePathsFiltered[si].normalizedPoints
                    );
                    
                    // 大小相似度
                    const sizeRatio = Math.min(targetPathsFiltered[ti].relativeSize, sourcePathsFiltered[si].relativeSize) / 
                                      Math.max(targetPathsFiltered[ti].relativeSize, sourcePathsFiltered[si].relativeSize) || 0;
                    
                    // 大小惩罚 - 当语义相似度高时更宽松
                    let sizePenalty = 1.0;
                    if (semanticScore >= 70) {
                        if (sizeRatio < 0.1) sizePenalty = 0.7;
                        else if (sizeRatio < 0.3) sizePenalty = 0.85;
                        else sizePenalty = 0.95;
                    } else {
                        if (sizeRatio < 0.1) sizePenalty = 0.4;
                        else if (sizeRatio < 0.3) sizePenalty = 0.7;
                        else if (sizeRatio < 0.5) sizePenalty = 0.85;
                    }
                    
                    bestShapeScore = Math.max(bestShapeScore, shapeSim * sizePenalty);
                }
                
                // 融合策略：形状为主，语义为辅
                if (bestShapeScore >= 50) {
                    if (semanticScore >= 80) {
                        matchScores[si] = Math.min(100, bestShapeScore * 1.15 + semanticScore * 0.1);
                    } else if (semanticScore >= 60) {
                        matchScores[si] = Math.min(100, bestShapeScore * 1.08 + semanticScore * 0.05);
                    } else {
                        matchScores[si] = bestShapeScore;
                    }
                } else if (bestShapeScore >= 30 && semanticScore >= 75) {
                    matchScores[si] = Math.max(bestShapeScore * 1.2, semanticScore * 0.7);
                } else {
                    matchScores[si] = bestShapeScore;
                }
            }
            return { matchScores };
        }

        function getMatchLevel(score) {
            if (score >= 95) return 'high';
            if (score >= 60) return 'medium';
            return 'low';
        }

        // 根据分数生成渐变色
        // 普通模式: 0% = 灰色, 50% = 黄/橙色, 100% = 绿色
        // 色盲模式: 0% = 灰色, 50% = 橙色, 100% = 蓝色
        function getGradientColor(score) {
            // 确保分数在0-100范围内
            score = Math.max(0, Math.min(100, score));
            
            let h, s, l;
            
            if (colorBlindMode) {
                // 色盲模式：灰色 → 橙色 → 蓝色
                if (score <= 50) {
                    // 0-50%: 灰色 → 橙色
                    const t = score / 50;
                    h = 0 + t * 25;           // 0 → 25 (橙色)
                    s = 0 + t * 85;           // 0% → 85%
                    l = 50 + t * 5;           // 50% → 55%
                } else {
                    // 50-100%: 橙色 → 蓝色
                    const t = (score - 50) / 50;
                    h = 25 + t * 185;         // 25 → 210 (蓝色)
                    s = 85 - t * 15;          // 85% → 70%
                    l = 55 + t * 10;          // 55% → 65%
                }
            } else {
                // 普通模式：灰色 → 黄色 → 绿色
                if (score <= 50) {
                    // 0-50%: 灰色 → 黄/橙色
                    const t = score / 50;
                    h = 0 + t * 45;           // 0 → 45
                    s = 0 + t * 70;           // 0% → 70%
                    l = 50 + t * 5;           // 50% → 55%
                } else {
                    // 50-100%: 黄色 → 绿色
                    const t = (score - 50) / 50;
                    h = 45 + t * 70;          // 45 → 115
                    s = 70 - t * 30;          // 70% → 40%
                    l = 55 - t * 3;           // 55% → 52%
                }
            }
            
            return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
        }

        function getMatchColor(level, score) {
            // 如果提供了分数，使用渐变色
            if (typeof score === 'number') {
                return getGradientColor(score);
            }
            // 降级到三色模式
            switch (level) {
                case 'high': return 'var(--color-correct)';
                case 'medium': return 'var(--color-present)';
                case 'low': return 'var(--color-absent)';
                default: return 'var(--color-absent)';
            }
        }

        // ==================== 嵌套检测函数 ====================
        function determineNestingLevelsLocal(pathsData) {
            const n = pathsData.length;
            const levels = new Array(n).fill(0);
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (i !== j && isPathContainedByLocal(pathsData[i].points, pathsData[j].points)) {
                        levels[i]++;
                    }
                }
            }
            return levels;
        }

        function isPathContainedByLocal(pathAPoints, pathBPoints) {
            const boundsA = getPathBoundsLocal(pathAPoints);
            const boundsB = getPathBoundsLocal(pathBPoints);

            if (!boundsA || !boundsB) return false;
            if (boundsA.minX < boundsB.minX || boundsA.maxX > boundsB.maxX ||
                boundsA.minY < boundsB.minY || boundsA.maxY > boundsB.maxY) {
                return false;
            }

            let insideCount = 0;
            const sampleSize = Math.min(pathAPoints.length, 10);
            const step = Math.max(1, Math.floor(pathAPoints.length / sampleSize));

            for (let i = 0; i < pathAPoints.length; i += step) {
                if (pointInPolygonLocal(pathAPoints[i], pathBPoints)) {
                    insideCount++;
                }
            }
            return insideCount > sampleSize * 0.8;
        }

        function getPathBoundsLocal(points) {
            if (!points || points.length === 0) return null;
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            for (const p of points) {
                minX = Math.min(minX, p.x);
                minY = Math.min(minY, p.y);
                maxX = Math.max(maxX, p.x);
                maxY = Math.max(maxY, p.y);
            }
            return { minX, minY, maxX, maxY };
        }

        function pointInPolygonLocal(point, polygon) {
            let inside = false;
            const n = polygon.length;
            for (let i = 0, j = n - 1; i < n; j = i++) {
                const xi = polygon[i].x, yi = polygon[i].y;
                const xj = polygon[j].x, yj = polygon[j].y;
                if (((yi > point.y) !== (yj > point.y)) &&
                    (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi)) {
                    inside = !inside;
                }
            }
            return inside;
        }

        // ==================== SVG 创建 ====================
        function createFullGlyphSvg(paths, nestingLevels, pathColors, displaySize = 80) {
            return createFullGlyphSvgWithIds(paths, nestingLevels, pathColors, displaySize);
        }

        function createFullGlyphSvgWithIds(paths, nestingLevels, pathColors, displaySize = 80) {
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            paths.forEach(p => {
                minX = Math.min(minX, p.bounds.minX);
                minY = Math.min(minY, p.bounds.minY);
                maxX = Math.max(maxX, p.bounds.maxX);
                maxY = Math.max(maxY, p.bounds.maxY);
            });

            const padding = 10;
            const width = (maxX - minX) + padding * 2;
            const height = (maxY - minY) + padding * 2;

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', displaySize);
            svg.setAttribute('height', displaySize);
            svg.setAttribute('viewBox', `${minX - padding} ${minY - padding} ${width} ${height}`);

            const sortedIndices = paths.map((_, i) => i).sort((a, b) => nestingLevels[a] - nestingLevels[b]);

            sortedIndices.forEach(index => {
                const pathData = paths[index];
                const { color } = pathColors[index];

                const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathElement.setAttribute('d', pathData.pathString);
                pathElement.setAttribute('fill', color);
                pathElement.setAttribute('stroke', 'var(--color-border-dark)');
                pathElement.setAttribute('stroke-width', '0.5');
                pathElement.setAttribute('data-index', index);
                pathElement.style.transition = 'stroke-width 0.2s, stroke 0.2s';
                svg.appendChild(pathElement);
            });

            return svg;
        }

        // ==================== 手写输入法 ====================
        // HanziLookup 原版库已通过 script 标签加载
        // Google IME 作为备选在线方案
        
        // Google IME 识别函数
        function recognizeWithOnlineIME(strokes, url, callback) {
            // 转换笔画格式: [[x1,x2,...], [y1,y2,...]] for each stroke
            const trace = strokes.map(stroke => {
                const xs = stroke.map(p => p[0]);
                const ys = stroke.map(p => p[1]);
                return [xs, ys];
            });
            
            const data = JSON.stringify({
                "options": "enable_pre_space",
                "requests": [{
                    "writing_guide": {
                        "writing_area_width": 256,
                        "writing_area_height": 256
                    },
                    "ink": trace,
                    "language": "zh_CN"
                }]
            });
            
            const xhr = new XMLHttpRequest();
            xhr.timeout = 5000; // 5秒超时
            xhr.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            const response = JSON.parse(this.responseText);
                            if (response.length > 1 && response[1] && response[1][0]) {
                                const results = response[1][0][1] || [];
                                // 只保留单字结果
                                const singleChars = results.filter(r => r.length === 1).slice(0, 10);
                                callback(singleChars.map(char => ({ character: char, score: 1 })));
                            } else {
                                callback([]);
                            }
                        } catch (e) {
                            callback(null, e);
                        }
                    } else {
                        callback(null, new Error('IME 请求失败: ' + this.status));
                    }
                }
            });
            xhr.addEventListener("timeout", function() {
                callback(null, new Error('IME 请求超时'));
            });
            xhr.addEventListener("error", function() {
                callback(null, new Error('IME 网络错误'));
            });
            
            xhr.open("POST", url);
            xhr.setRequestHeader("content-type", "application/json");
            xhr.send(data);
        }
        
        // 测试在线 IME 可用性
        function testOnlineIME(type) {
            const url = type === 'proxy' ? PROXY_IME_URL : GOOGLE_IME_URL;
            updateEngineStatus('testing', '测试中...');
            recognizeWithOnlineIME([[[128, 128], [128, 200]]], url, (results, error) => {
                if (error) {
                    if (type === 'proxy') {
                        proxyIMEAvailable = false;
                    } else {
                        googleIMEAvailable = false;
                    }
                    updateEngineStatus('error', '不可用');
                    // 自动回退
                    if (currentEngine === type) {
                        if (type === 'google') {
                            // Google 不可用，尝试代理
                            currentEngine = 'proxy';
                            handwriteEngineSelect.value = 'proxy';
                            if (proxyIMEAvailable === null) {
                                testOnlineIME('proxy');
                            } else if (proxyIMEAvailable) {
                                updateEngineStatus('online', '在线');
                            } else {
                                // 代理也不可用，回退到离线
                                currentEngine = 'hanzilookup';
                                handwriteEngineSelect.value = 'hanzilookup';
                                updateEngineStatus('offline', '离线');
                            }
                        } else {
                            // 代理不可用，回退到离线
                            currentEngine = 'hanzilookup';
                            handwriteEngineSelect.value = 'hanzilookup';
                            updateEngineStatus('offline', '离线');
                        }
                    }
                } else {
                    if (type === 'proxy') {
                        proxyIMEAvailable = true;
                    } else {
                        googleIMEAvailable = true;
                    }
                    updateEngineStatus('online', '在线');
                }
            });
        }
        
        // 更新引擎状态显示
        function updateEngineStatus(type, text) {
            handwriteEngineStatus.textContent = text;
            handwriteEngineStatus.className = 'handwrite-engine-status ' + type;
        }

        // 初始化手写板
        function initHandwriting() {
            handwriteCtx = handwriteCanvas.getContext('2d');
            drawCanvasGuides();
            
            // 鼠标事件
            handwriteCanvas.addEventListener('mousedown', onDrawStart);
            handwriteCanvas.addEventListener('mousemove', onDrawMove);
            handwriteCanvas.addEventListener('mouseup', onDrawEnd);
            handwriteCanvas.addEventListener('mouseleave', onDrawEnd);
            
            // 触摸事件
            handwriteCanvas.addEventListener('touchstart', onTouchStart);
            handwriteCanvas.addEventListener('touchmove', onTouchMove);
            handwriteCanvas.addEventListener('touchend', onTouchEnd);
            
            // 按钮事件
            handwriteBtn.addEventListener('click', openHandwriteModal);
            handwriteCloseBtn.addEventListener('click', closeHandwriteModal);
            handwriteUndoBtn.addEventListener('click', undoStroke);
            handwriteClearBtn.addEventListener('click', clearCanvas);
            
            // 引擎选择事件
            handwriteEngineSelect.addEventListener('change', (e) => {
                currentEngine = e.target.value;
                if (currentEngine === 'google') {
                    if (googleIMEAvailable === null) {
                        testOnlineIME('google');
                    } else if (googleIMEAvailable === false) {
                        updateEngineStatus('error', '不可用');
                    } else {
                        updateEngineStatus('online', '在线');
                    }
                } else if (currentEngine === 'proxy') {
                    if (proxyIMEAvailable === null) {
                        testOnlineIME('proxy');
                    } else if (proxyIMEAvailable === false) {
                        updateEngineStatus('error', '不可用');
                    } else {
                        updateEngineStatus('online', '在线');
                    }
                } else {
                    updateEngineStatus('offline', '离线');
                }
                // 如果有笔画，重新识别
                if (handwriteStrokes.length > 0) {
                    recognizeCharacter();
                }
            });
            
            // 点击弹窗外部关闭
            handwriteModal.addEventListener('click', (e) => {
                if (e.target === handwriteModal) {
                    closeHandwriteModal();
                }
            });
        }

        function drawCanvasGuides() {
            const ctx = handwriteCtx;
            const w = handwriteCanvas.width;
            const h = handwriteCanvas.height;
            
            ctx.clearRect(0, 0, w, h);
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-border') || '#d3d6da';
            
            // 边框
            ctx.beginPath();
            ctx.rect(0, 0, w, h);
            ctx.stroke();
            
            // 十字辅助线
            ctx.beginPath();
            ctx.moveTo(w / 2, 0);
            ctx.lineTo(w / 2, h);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, h / 2);
            ctx.lineTo(w, h / 2);
            ctx.stroke();
            
            // 对角线
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(w, h);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w, 0);
            ctx.lineTo(0, h);
            ctx.stroke();
            
            ctx.setLineDash([]);
            
            // 重绘已有笔画
            redrawStrokes();
        }

        function redrawStrokes() {
            const ctx = handwriteCtx;
            ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-text') || '#1a1a1b';
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            for (const stroke of handwriteStrokes) {
                if (stroke.length < 2) continue;
                ctx.beginPath();
                ctx.moveTo(stroke[0][0], stroke[0][1]);
                for (let i = 1; i < stroke.length; i++) {
                    ctx.lineTo(stroke[i][0], stroke[i][1]);
                }
                ctx.stroke();
            }
        }

        function getCanvasPos(e) {
            const rect = handwriteCanvas.getBoundingClientRect();
            return [
                (e.clientX - rect.left) * (handwriteCanvas.width / rect.width),
                (e.clientY - rect.top) * (handwriteCanvas.height / rect.height)
            ];
        }

        function onDrawStart(e) {
            e.preventDefault();
            isDrawing = true;
            currentStroke = [getCanvasPos(e)];
            
            handwriteCtx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-text') || '#1a1a1b';
            handwriteCtx.lineWidth = 5;
            handwriteCtx.lineCap = 'round';
            handwriteCtx.lineJoin = 'round';
            handwriteCtx.beginPath();
            handwriteCtx.moveTo(currentStroke[0][0], currentStroke[0][1]);
        }

        function onDrawMove(e) {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getCanvasPos(e);
            currentStroke.push(pos);
            handwriteCtx.lineTo(pos[0], pos[1]);
            handwriteCtx.stroke();
            handwriteCtx.beginPath();
            handwriteCtx.moveTo(pos[0], pos[1]);
        }

        function onDrawEnd(e) {
            if (!isDrawing) return;
            isDrawing = false;
            if (currentStroke.length > 1) {
                handwriteStrokes.push(currentStroke);
                recognizeCharacter();
            }
            currentStroke = [];
        }

        function onTouchStart(e) {
            e.preventDefault();
            e.stopPropagation();
            // 确保输入框不会获取焦点
            document.activeElement?.blur();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            onDrawStart(mouseEvent);
        }

        function onTouchMove(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            onDrawMove(mouseEvent);
        }

        function onTouchEnd(e) {
            e.preventDefault();
            onDrawEnd(e);
        }

        function undoStroke() {
            if (handwriteStrokes.length > 0) {
                handwriteStrokes.pop();
                drawCanvasGuides();
                if (handwriteStrokes.length > 0) {
                    recognizeCharacter();
                } else {
                    handwriteCandidates.innerHTML = '<span class="handwrite-placeholder">在上方书写汉字</span>';
                }
            }
        }

        function clearCanvas() {
            handwriteStrokes = [];
            drawCanvasGuides();
            handwriteCandidates.innerHTML = '<span class="handwrite-placeholder">在上方书写汉字</span>';
        }

        function openHandwriteModal() {
            handwriteModal.classList.add('show');
            
            // 让输入框失去焦点，防止在移动端弹出软键盘
            guessInput.blur();
            document.activeElement?.blur();
            
            // 更新引擎状态显示
            if (currentEngine === 'google') {
                if (googleIMEAvailable === null) {
                    testOnlineIME('google');
                } else if (googleIMEAvailable) {
                    updateEngineStatus('online', '在线');
                } else {
                    updateEngineStatus('error', '不可用');
                }
            } else if (currentEngine === 'proxy') {
                if (proxyIMEAvailable === null) {
                    testOnlineIME('proxy');
                } else if (proxyIMEAvailable) {
                    updateEngineStatus('online', '在线');
                } else {
                    updateEngineStatus('error', '不可用');
                }
            } else {
                updateEngineStatus('offline', '离线');
            }
            
            // 加载 HanziLookup 数据（如果尚未加载）
            if (!hanziLookupLoaded && !hanziLookupLoading) {
                hanziLookupLoading = true;
                if (currentEngine === 'hanzilookup') {
                    handwriteCandidates.innerHTML = '<span class="handwrite-loading">正在加载手写识别数据...</span>';
                }
                
                HanziLookup.init('mmah', 'https://cdn.jsdelivr.net/gh/gugray/HanziLookupJS@master/dist/mmah.json', function(success) {
                    hanziLookupLoading = false;
                    if (success) {
                        hanziLookupLoaded = true;
                        if (handwriteStrokes.length === 0) {
                            handwriteCandidates.innerHTML = '<span class="handwrite-placeholder">在上方书写汉字</span>';
                        }
                    } else {
                        if (currentEngine === 'hanzilookup') {
                            handwriteCandidates.innerHTML = '<span class="handwrite-placeholder">基础引擎加载失败</span>';
                        }
                    }
                });
            }
            
            // 重绘画布（应用当前主题颜色）
            setTimeout(() => {
                drawCanvasGuides();
            }, 50);
        }

        function closeHandwriteModal() {
            handwriteModal.classList.remove('show');
        }

        function recognizeCharacter() {
            if (handwriteStrokes.length === 0) {
                handwriteCandidates.innerHTML = '<span class="handwrite-placeholder">在上方书写汉字</span>';
                return;
            }
            
            handwriteCandidates.innerHTML = '<span class="handwrite-loading">识别中...</span>';
            
            if (currentEngine === 'google' && googleIMEAvailable) {
                // 使用 Google 直连
                recognizeWithOnlineIME(handwriteStrokes, GOOGLE_IME_URL, (results, error) => {
                    if (error) {
                        // Google 失败，尝试代理
                        console.warn('Google 直连失败，尝试代理:', error);
                        tryProxyIME();
                    } else {
                        displayCandidates(results);
                    }
                });
            } else if (currentEngine === 'proxy' && proxyIMEAvailable) {
                // 使用代理
                tryProxyIME();
            } else {
                // 使用离线 HanziLookup
                recognizeWithHanziLookup();
            }
        }
        
        function tryProxyIME() {
            if (proxyIMEAvailable === false) {
                // 代理不可用，回退到离线
                recognizeWithHanziLookup();
                return;
            }
            recognizeWithOnlineIME(handwriteStrokes, PROXY_IME_URL, (results, error) => {
                if (error) {
                    // 代理也失败，回退到离线
                    console.warn('代理失败，回退到离线引擎:', error);
                    proxyIMEAvailable = false;
                    recognizeWithHanziLookup();
                } else {
                    displayCandidates(results);
                }
            });
        }
        
        function recognizeWithHanziLookup() {
            if (!hanziLookupLoaded) {
                handwriteCandidates.innerHTML = '<span class="handwrite-loading">正在加载基础引擎...</span>';
                return;
            }
            
            // 分析字符
            const analyzedChar = new HanziLookup.AnalyzedCharacter(handwriteStrokes);
            
            // 匹配
            const matcher = new HanziLookup.Matcher('mmah');
            matcher.match(analyzedChar, 10, function(matches) {
                displayCandidates(matches);
            });
        }

        function displayCandidates(matches) {
            if (matches.length === 0) {
                const msg = (window.t && window.t('handwrite_no_result')) || '未识别到汉字';
                handwriteCandidates.innerHTML = `<span class="handwrite-placeholder">${msg}</span>`;
                return;
            }
            
            handwriteCandidates.innerHTML = '';
            for (const match of matches) {
                const btn = document.createElement('button');
                btn.className = 'handwrite-candidate';
                btn.textContent = match.character;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectCandidate(match.character);
                });
                // 防止触摸时触发焦点变化
                btn.addEventListener('touchstart', (e) => {
                    e.stopPropagation();
                });
                handwriteCandidates.appendChild(btn);
            }
        }

        function selectCandidate(char) {
            // 填入输入框
            guessInput.value = char;
            
            // 关闭手写板
            closeHandwriteModal();
            
            // 清空手写板
            clearCanvas();
            
            // 触发输入事件，启动3秒计时器
            guessInput.dispatchEvent(new Event('input'));
            
            // 聚焦输入框
            guessInput.focus();
        }

        // ==================== 启动 ====================
        init();
        initHandwriting();
        
        // 页面加载时预先测试在线IME可用性（Google → Proxy 回退）
        testOnlineIME('google');
