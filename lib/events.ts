import { GameEvent } from "./types";

export const BASE_EVENTS: GameEvent[] = [
  {
    id: "e1",
    description: "总统先生，一个流氓国家正在我们的盟友附近测试远程导弹。我们应该部署航母打击群吗？",
    characterName: "万斯将军",
    characterType: "Four-Star General",
    leftChoice: { text: "部署航母", effects: { approval: 5, economy: -10, military: 15, diplomacy: -10 } },
    rightChoice: { text: "外交斡旋", effects: { approval: -5, economy: 0, military: -5, diplomacy: 10 } }
  },
  {
    id: "e2",
    description: "由于全球供应链问题，股市正在崩溃。我们应该通过大规模刺激计划吗？",
    characterName: "财政部长",
    characterType: "Finance Minister",
    leftChoice: { text: "印钞票", effects: { approval: 15, economy: 10, military: 0, diplomacy: -5 } },
    rightChoice: { text: "让市场自行修正", effects: { approval: -15, economy: -10, military: 0, diplomacy: 5 } }
  },
  {
    id: "e3",
    description: "一个主要盟友要求增加军事援助以应对代理人战争。这将花费数十亿美元。",
    characterName: "国务卿",
    characterType: "Diplomat",
    leftChoice: { text: "提供援助", effects: { approval: -5, economy: -15, military: 10, diplomacy: 15 } },
    rightChoice: { text: "拒绝", effects: { approval: 5, economy: 10, military: -5, diplomacy: -15 } }
  },
  {
    id: "e4",
    description: "全国各地爆发了针对一项有争议的新税法的抗议活动。警方要求联邦政府提供支持。",
    characterName: "幕僚长",
    characterType: "Politician",
    leftChoice: { text: "派遣国民警卫队", effects: { approval: -20, economy: -5, military: 10, diplomacy: -5 } },
    rightChoice: { text: "废除税法", effects: { approval: 20, economy: -15, military: -5, diplomacy: 0 } }
  },
  {
    id: "e5",
    description: "我们的情报机构发现了一起来自竞争对手超级大国的大规模网络攻击。",
    characterName: "中情局局长",
    characterType: "Spy Chief",
    leftChoice: { text: "发动反击", effects: { approval: 10, economy: -5, military: 15, diplomacy: -20 } },
    rightChoice: { text: "实施制裁", effects: { approval: 0, economy: -10, military: 5, diplomacy: -10 } }
  },
  {
    id: "e6",
    description: "全球大流行病爆发。我们应该关闭边境并强制封锁吗？",
    characterName: "卫生局局长",
    characterType: "Doctor",
    leftChoice: { text: "全面封锁", effects: { approval: -10, economy: -20, military: 0, diplomacy: -5 } },
    rightChoice: { text: "保持开放", effects: { approval: -20, economy: 10, military: -5, diplomacy: -10 } }
  },
  {
    id: "e7",
    description: "一位科技亿万富翁提出为我们的太空部队提供资金，以换取减税。",
    characterName: "科技巨头CEO",
    characterType: "Billionaire",
    leftChoice: { text: "接受", effects: { approval: -10, economy: 15, military: 10, diplomacy: 0 } },
    rightChoice: { text: "拒绝", effects: { approval: 10, economy: -5, military: -5, diplomacy: 0 } }
  },
  {
    id: "e8",
    description: "联合国提出了一项全球气候条约，这将严重限制我们的制造业。",
    characterName: "联合国大使",
    characterType: "Diplomat",
    leftChoice: { text: "签署条约", effects: { approval: 10, economy: -20, military: -5, diplomacy: 20 } },
    rightChoice: { text: "拒绝签署", effects: { approval: -10, economy: 15, military: 5, diplomacy: -20 } }
  },
  {
    id: "e9",
    description: "涉及副总统的丑闻被泄露给媒体。我们应该迫使他辞职吗？",
    characterName: "新闻秘书",
    characterType: "Spokesperson",
    leftChoice: { text: "解雇他", effects: { approval: 10, economy: 0, military: 0, diplomacy: -5 } },
    rightChoice: { text: "为他辩护", effects: { approval: -20, economy: 0, military: 0, diplomacy: 0 } }
  },
  {
    id: "e10",
    description: "我们的军事承包商开发了一种新的自主无人机群。我们应该在战斗中部署它吗？",
    characterName: "国防部长",
    characterType: "Military Official",
    leftChoice: { text: "部署", effects: { approval: -5, economy: -10, military: 20, diplomacy: -15 } },
    rightChoice: { text: "暂缓", effects: { approval: 5, economy: 5, military: -10, diplomacy: 5 } }
  },
  {
    id: "e11",
    description: "一场大飓风摧毁了东海岸。我们需要紧急资金。",
    characterName: "联邦应急管理局局长",
    characterType: "Emergency Responder",
    leftChoice: { text: "批准资金", effects: { approval: 15, economy: -15, military: -5, diplomacy: 0 } },
    rightChoice: { text: "推迟", effects: { approval: -20, economy: 5, military: 0, diplomacy: 0 } }
  },
  {
    id: "e12",
    description: "一位外国领导人来访，要求我们降低关税，否则他们将对我们的农产品实施禁运。",
    characterName: "外国领导人",
    characterType: "Foreign President",
    leftChoice: { text: "降低关税", effects: { approval: -10, economy: 10, military: 0, diplomacy: 15 } },
    rightChoice: { text: "不妥协", effects: { approval: 10, economy: -15, military: 5, diplomacy: -15 } }
  },
  {
    id: "e13",
    description: "退伍军人正在白宫外抗议，要求获得更好的医疗福利。",
    characterName: "抗议领袖",
    characterType: "Veteran",
    leftChoice: { text: "增加福利", effects: { approval: 15, economy: -10, military: 10, diplomacy: 0 } },
    rightChoice: { text: "无视他们", effects: { approval: -20, economy: 5, military: -15, diplomacy: 0 } }
  },
  {
    id: "e14",
    description: "一名举报人泄露了显示非法监视公民的机密文件。",
    characterName: "记者",
    characterType: "News Anchor",
    leftChoice: { text: "赦免他", effects: { approval: 15, economy: 0, military: -15, diplomacy: 5 } },
    rightChoice: { text: "起诉他", effects: { approval: -15, economy: 0, military: 10, diplomacy: -5 } }
  },
  {
    id: "e15",
    description: "油价暴涨。我们应该开放受保护的联邦土地进行钻探吗？",
    characterName: "能源部长",
    characterType: "Politician",
    leftChoice: { text: "允许钻探", effects: { approval: -10, economy: 20, military: 5, diplomacy: -10 } },
    rightChoice: { text: "保护土地", effects: { approval: 15, economy: -15, military: -5, diplomacy: 5 } }
  },
  {
    id: "e16",
    description: "我们在欧洲的盟友正在组建一支统一的军队，并要求我们减少在那里的驻军。",
    characterName: "欧洲大使",
    characterType: "Diplomat",
    leftChoice: { text: "撤军", effects: { approval: 10, economy: 15, military: -15, diplomacy: -10 } },
    rightChoice: { text: "拒绝", effects: { approval: -5, economy: -10, military: 10, diplomacy: -15 } }
  },
  {
    id: "e17",
    description: "一场大规模的劳工罢工使交通部门瘫痪。经济正在流血。",
    characterName: "工会领袖",
    characterType: "Worker",
    leftChoice: { text: "满足要求", effects: { approval: 15, economy: -15, military: 0, diplomacy: 0 } },
    rightChoice: { text: "破坏罢工", effects: { approval: -20, economy: 10, military: 5, diplomacy: 0 } }
  },
  {
    id: "e18",
    description: "一个恐怖组织在海外大使馆劫持了人质。我们应该派遣特种部队吗？",
    characterName: "特种部队指挥官",
    characterType: "Soldier",
    leftChoice: { text: "派兵突击", effects: { approval: 10, economy: -5, military: 15, diplomacy: -10 } },
    rightChoice: { text: "谈判", effects: { approval: -10, economy: 0, military: -10, diplomacy: 5 } }
  },
  {
    id: "e19",
    description: "国债已达到临界水平。我们必须削减开支或增税。",
    characterName: "美联储主席",
    characterType: "Banker",
    leftChoice: { text: "削减开支", effects: { approval: -15, economy: 10, military: -10, diplomacy: -5 } },
    rightChoice: { text: "增加税收", effects: { approval: -20, economy: 15, military: 0, diplomacy: 0 } }
  },
  {
    id: "e20",
    description: "一项新的AI技术有望彻底改变我们的军队，但它可能会导致大规模失业。",
    characterName: "科学顾问",
    characterType: "Scientist",
    leftChoice: { text: "采用技术", effects: { approval: -15, economy: 10, military: 20, diplomacy: 5 } },
    rightChoice: { text: "禁止使用", effects: { approval: 15, economy: -10, military: -15, diplomacy: -5 } }
  },
  {
    id: "e21",
    description: "一个敌对国家对我们的电网发动了网络攻击。数百万人断电。",
    characterName: "国土安全部部长",
    characterType: "Security Official",
    leftChoice: { text: "发动反击", effects: { approval: 10, economy: -10, military: 15, diplomacy: -20 } },
    rightChoice: { text: "专注修复", effects: { approval: -10, economy: -15, military: -5, diplomacy: 0 } }
  },
  {
    id: "e22",
    description: "一家大型公司威胁要将其总部迁往海外以避税。",
    characterName: "商务部长",
    characterType: "Politician",
    leftChoice: { text: "提供补贴", effects: { approval: -10, economy: 10, military: 0, diplomacy: 0 } },
    rightChoice: { text: "让他们走", effects: { approval: 15, economy: -15, military: 0, diplomacy: 5 } }
  },
  {
    id: "e23",
    description: "我们的情报表明，邻国正在秘密研发核武器。",
    characterName: "国家安全顾问",
    characterType: "Spy",
    leftChoice: { text: "先发制人打击", effects: { approval: -10, economy: -20, military: 20, diplomacy: -30 } },
    rightChoice: { text: "实施制裁", effects: { approval: 5, economy: -5, military: 0, diplomacy: -10 } }
  },
  {
    id: "e24",
    description: "一个受欢迎的社交媒体平台正在传播虚假信息。我们应该封禁它吗？",
    characterName: "联邦通信委员会主席",
    characterType: "Regulator",
    leftChoice: { text: "封禁", effects: { approval: -15, economy: -5, military: 0, diplomacy: -5 } },
    rightChoice: { text: "加强监管", effects: { approval: 5, economy: -10, military: 0, diplomacy: 0 } }
  },
  {
    id: "e25",
    description: "一个发展中国家发生了大地震。他们乞求我们的帮助。",
    characterName: "国际开发署署长",
    characterType: "Humanitarian",
    leftChoice: { text: "提供援助", effects: { approval: 10, economy: -10, military: -5, diplomacy: 20 } },
    rightChoice: { text: "专注国内", effects: { approval: -5, economy: 5, military: 0, diplomacy: -15 } }
  },
  {
    id: "e26",
    description: "军方希望将国防预算增加20%，以实现部队现代化。",
    characterName: "参谋长联席会议主席",
    characterType: "General",
    leftChoice: { text: "批准", effects: { approval: -10, economy: -15, military: 20, diplomacy: -5 } },
    rightChoice: { text: "拒绝", effects: { approval: 10, economy: 10, military: -15, diplomacy: 5 } }
  },
  {
    id: "e27",
    description: "与亚洲的一项新贸易协议有望促进经济增长，但会损害当地制造业。",
    characterName: "贸易代表",
    characterType: "Economist",
    leftChoice: { text: "签署协议", effects: { approval: -15, economy: 20, military: 0, diplomacy: 15 } },
    rightChoice: { text: "保护本地产业", effects: { approval: 15, economy: -10, military: 0, diplomacy: -10 } }
  },
  {
    id: "e28",
    description: "一群参议员威胁要阻挠你的议程，除非你赦免一个有争议的人物。",
    characterName: "参议院多数党领袖",
    characterType: "Politician",
    leftChoice: { text: "赦免", effects: { approval: -20, economy: 5, military: 0, diplomacy: 0 } },
    rightChoice: { text: "拒绝", effects: { approval: 15, economy: -10, military: 0, diplomacy: 0 } }
  },
  {
    id: "e29",
    description: "一名叛变将军控制了前苏联国家的一个核导弹发射井。",
    characterName: "国家情报总监",
    characterType: "Spy Chief",
    leftChoice: { text: "派遣突击队", effects: { approval: 10, economy: -5, military: 15, diplomacy: -15 } },
    rightChoice: { text: "与俄罗斯合作", effects: { approval: -5, economy: 0, military: -5, diplomacy: 15 } }
  },
  {
    id: "e30",
    description: "公众要求实行全民医疗保健。这将花费数万亿美元。",
    characterName: "卫生部长",
    characterType: "Doctor",
    leftChoice: { text: "实施", effects: { approval: 25, economy: -25, military: -10, diplomacy: 5 } },
    rightChoice: { text: "否决", effects: { approval: -25, economy: 15, military: 5, diplomacy: -5 } }
  }
];
