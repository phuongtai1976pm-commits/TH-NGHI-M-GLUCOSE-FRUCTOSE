import { Reagent, ExperimentDefinition, QuizQuestion, MoleculeInfo } from '../types';

export const REAGENTS: Reagent[] = [
  {
    id: 'glucose_2',
    name: 'Dung dịch Glucose',
    formula: 'Glucose C₆H₁₂O₆',
    concentration: '2%',
    color: 'rgba(240, 248, 255, 0.6)',
    textColor: '#1e293b',
    category: 'sugar',
    description: 'Glucose (Aldehyde polyol) làm MẤT MÀU nước Bromine.',
  },
  {
    id: 'fructose_2',
    name: 'Dung dịch Fructose',
    formula: 'Fructose C₆H₁₂O₆',
    concentration: '2%',
    color: 'rgba(240, 253, 250, 0.6)',
    textColor: '#1e293b',
    category: 'sugar',
    description: 'Fructose (Ketone polyol) KHÔNG làm mất màu nước Bromine.',
  },
  {
    id: 'naoh_10',
    name: 'Dung dịch NaOH',
    formula: 'NaOH',
    concentration: '10%',
    color: 'rgba(255, 255, 255, 0.5)',
    textColor: '#0f172a',
    category: 'reagent',
    description: 'Dung dịch Sodium Hydroxide 10%, tạo môi trường kiềm.',
  },
  {
    id: 'cuso4_5',
    name: 'Dung dịch CuSO₄',
    formula: 'CuSO₄',
    concentration: '5%',
    color: 'rgba(59, 130, 246, 0.75)', // Blue solution
    textColor: '#ffffff',
    category: 'reagent',
    description: 'Dung dịch Copper(II) Sulfate 5%, có màu xanh dương đặc trưng.',
  },
  {
    id: 'agno3_1',
    name: 'Dung dịch AgNO₃',
    formula: 'AgNO₃',
    concentration: '1%',
    color: 'rgba(241, 245, 249, 0.6)',
    textColor: '#0f172a',
    category: 'reagent',
    description: 'Dung dịch Silver Nitrate 1%, không màu, dùng điều chế thuốc thử Tollens.',
  },
  {
    id: 'nh3_5',
    name: 'Dung dịch NH₃',
    formula: 'NH₃',
    concentration: '5%',
    color: 'rgba(248, 250, 252, 0.5)',
    textColor: '#0f172a',
    category: 'reagent',
    description: 'Dung dịch Ammonia 5%, có mùi khai nhẹ, dùng hòa tan tủa Ag₂O.',
  },
  {
    id: 'br2_water',
    name: 'Nước Bromine',
    formula: 'Br₂ (aq)',
    concentration: 'Đỏ nâu',
    color: 'rgba(180, 50, 10, 0.95)', // Distinct reddish-brown
    textColor: '#ffffff',
    category: 'indicator',
    description: 'Dung dịch bromine có màu ĐỎ NÂU đặc trưng. Dùng để phân biệt Glucose (mất màu đỏ nâu) và Fructose (không mất màu).',
  },
  {
    id: 'yeast_enzyme',
    name: 'Men rượu / Enzyme',
    formula: 'Enzyme zymase',
    concentration: 'Hỗn dịch',
    color: 'rgba(217, 185, 137, 0.7)',
    textColor: '#3f2e1a',
    category: 'catalyst',
    description: 'Hỗn dịch men rượu chứa enzyme xúc tác phản ứng lên men Glucose thành Ethanol.',
  },
  {
    id: 'limewater',
    name: 'Nước vôi trong',
    formula: 'Ca(OH)₂',
    concentration: 'Bão hòa',
    color: 'rgba(255, 255, 255, 0.4)',
    textColor: '#0f172a',
    category: 'indicator',
    description: 'Dung dịch Ca(OH)₂ trong suốt, dùng nhận biết khí CO₂ phát sinh từ lên men.',
  },
  {
    id: 'distilled_water',
    name: 'Nước cất',
    formula: 'H₂O',
    concentration: 'Nguyên chất',
    color: 'rgba(224, 242, 254, 0.4)',
    textColor: '#0f172a',
    category: 'reagent',
    description: 'Nước cất dùng pha loãng và tráng rửa dụng cụ thí nghiệm.',
  }
];

export const EXPERIMENTS: ExperimentDefinition[] = [
  {
    id: 'exp1_cuoh2_cold',
    title: 'Thí nghiệm 1: Tác dụng với Cu(OH)₂ ở nhiệt độ thường',
    subTitle: 'Chứng minh tính chất Polyalcohol (nhiều nhóm -OH liền kề)',
    badge: 'SGK Trang 22',
    targetCarbohydrate: 'both',
    objective: 'Quan sát sự hòa tan kết tủa Cu(OH)₂ màu xanh lam tạo thành dung dịch phức đồng-glucose/fructose có màu xanh lam tươi.',
    reagentsNeeded: ['naoh_10', 'cuso4_5', 'glucose_2'],
    equipmentNeeded: ['pipette', 'testTubeHolder', 'shake'],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cho khoảng 2 mL dung dịch NaOH 10% vào ống nghiệm.',
        requiredReagentId: 'naoh_10',
        actionPrompt: 'Nhấp hoặc kéo chai NaOH 10% để thêm 2 mL vào ống nghiệm',
      },
      {
        stepNumber: 2,
        instruction: 'Thêm tiếp khoảng 0.5 mL dung dịch CuSO₄ 5% vào ống nghiệm, lắc nhẹ.',
        requiredReagentId: 'cuso4_5',
        actionPrompt: 'Nhấp chai CuSO₄ 5% để tạo kết tủa Cu(OH)₂ xanh lam',
      },
      {
        stepNumber: 3,
        instruction: 'Thêm khoảng 3 mL dung dịch Glucose 2% (hoặc Fructose 2%) vào ống nghiệm và lắc nhẹ.',
        requiredReagentId: 'glucose_2',
        actionPrompt: 'Nhấp chai Glucose 2% (hoặc Fructose 2%) và chọn nút Lắc Nhẹ',
      },
      {
        stepNumber: 4,
        instruction: 'Lắc nhẹ ống nghiệm để quan sát sự tan tủa và đổi màu dung dịch.',
        requiredEquipment: 'shake',
        actionPrompt: 'Nhấp nút "Lắc nhẹ ống nghiệm" để xem kết quả',
      }
    ],
    phenomenon: 'Ban đầu xuất hiện kết tủa xanh lam của Cu(OH)₂. Khi thêm dung dịch Glucose (hoặc Fructose) và lắc nhẹ, kết tủa Cu(OH)₂ tan ra tạo thành dung dịch màu xanh lam tươi trong suốt.',
    chemicalExplanation: 'Phân tử Glucose và Fructose có 5 nhóm hydroxy (-OH) liền kề nhau, nên có tính chất của polyalcohol (ancol đa chức) có khả năng hòa tan Cu(OH)₂ ở nhiệt độ thường tạo phức đồng-saccharide tan.',
    chemicalEquation: '2C₆H₁₂O₆ + Cu(OH)₂ → (C₆H₁₁O₆)₂Cu + 2H₂O',
    simplifiedEquation: '2 Glucose + Cu(OH)₂ → Phức Đồng-Glucose (xanh lam tươi) + 2H₂O',
    distinguishingNote: 'Cả Glucose và Fructose đều cho hiện tượng hòa tan Cu(OH)₂ ở nhiệt độ thường giống nhau do đều chứa các nhóm -OH liền kề.',
    resultLiquidColor: 'rgba(14, 165, 233, 0.85)', // Bright blue complex
    resultPrecipitate: undefined
  },
  {
    id: 'exp2_cuoh2_heat',
    title: 'Thí nghiệm 2: Oxi hóa Glucose bằng Cu(OH)₂ khi đun nóng',
    subTitle: 'Chứng minh tính chất Aldehyde (-CHO)',
    badge: 'SGK Trang 22',
    targetCarbohydrate: 'both',
    objective: 'Chuyển dung dịch phức xanh lam sang kết tủa Cu₂O màu đỏ gạch khi đun nóng trên ngọn lửa đèn cồn.',
    reagentsNeeded: ['naoh_10', 'cuso4_5', 'glucose_2'],
    equipmentNeeded: ['pipette', 'burner', 'shake'],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cho 2 mL NaOH 10% + 0.5 mL CuSO₄ 5% vào ống nghiệm để tạo kết tủa Cu(OH)₂.',
        requiredReagentId: 'naoh_10',
        actionPrompt: 'Nhấp chai NaOH 10% để thêm vào ống nghiệm',
      },
      {
        stepNumber: 2,
        instruction: 'Thêm CuSO₄ 5% để thu được kết tủa Cu(OH)₂ xanh lam.',
        requiredReagentId: 'cuso4_5',
        actionPrompt: 'Nhấp chai CuSO₄ 5% để phản ứng tạo Cu(OH)₂',
      },
      {
        stepNumber: 3,
        instruction: 'Cho tiếp 3 mL dung dịch Glucose 2% vào ống nghiệm và lắc nhẹ tạo phức xanh lam.',
        requiredReagentId: 'glucose_2',
        actionPrompt: 'Nhấp chai Glucose 2% để tạo phức xanh lam',
      },
      {
        stepNumber: 4,
        instruction: 'Thắp đèn cồn và đun nóng nhẹ ống nghiệm trong vài phút.',
        requiredEquipment: 'burner',
        actionPrompt: 'Nhấp nút "Bật Đèn Cồn" để đun nóng dung dịch',
      }
    ],
    phenomenon: 'Khi đun nóng, dung dịch màu xanh lam tươi nhạt dần, xuất hiện kết tủa màu vàng nhạt CuOH, sau đó biến đổi thành kết tủa màu đỏ gạch Cu₂O lắng xuống đáy ống nghiệm.',
    chemicalExplanation: 'Nhóm aldehyde (-CHO) của Glucose bị Cu(OH)₂ trong môi trường kiềm oxi hóa tạo thành muối Sodium Gluconate, đồng thời Cu(II) bị khử thành Cu(I) dưới dạng kết tủa Cu₂O màu đỏ gạch. (Lưu ý: Fructose trong môi trường kiềm đun nóng cũng chuyển hóa thành Glucose nên cũng xuất hiện tủa đỏ gạch!).',
    chemicalEquation: 'CH₂OH[CHOH]₄CHO + 2Cu(OH)₂ + NaOH -(t°)→ CH₂OH[CHOH]₄COONa + Cu₂O↓ (đỏ gạch) + 3H₂O',
    simplifiedEquation: 'Glucose + 2Cu(OH)₂ + NaOH -(t°)→ Sodium Gluconate + Cu₂O↓ (đỏ gạch) + 3H₂O',
    distinguishingNote: 'Trong môi trường kiềm (OH⁻) và nhiệt độ cao, Fructose chuyển hóa thuận nghịch thành Glucose nên Fructose cũng cho phản ứng này.',
    resultLiquidColor: 'rgba(248, 250, 252, 0.7)',
    resultPrecipitate: {
      color: '#b91c1c',
      label: 'Kết tủa Cu₂O (Đỏ gạch)',
      type: 'brick-red'
    }
  },
  {
    id: 'exp3_tollens_mirror',
    title: 'Thí nghiệm 3: Phản ứng Tráng Bạc (Thuốc thử Tollens)',
    subTitle: 'Phản ứng đặc trưng của nhóm Aldehyde',
    badge: 'SGK Trang 23',
    targetCarbohydrate: 'both',
    objective: 'Điều chế thuốc thử Tollens [Ag(NH₃)₂]OH và ngâm cốc nước nóng để tạo lớp gương bạc Ag sáng bóng bám thành ống nghiệm.',
    reagentsNeeded: ['agno3_1', 'nh3_5', 'glucose_2'],
    equipmentNeeded: ['pipette', 'waterbath'],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cho khoảng 2 mL dung dịch AgNO₃ 1% vào ống nghiệm sạch.',
        requiredReagentId: 'agno3_1',
        actionPrompt: 'Nhấp chai AgNO₃ 1% để thêm vào ống nghiệm',
      },
      {
        stepNumber: 2,
        instruction: 'Thêm từ từ dung dịch NH₃ 5%, lắc nhẹ đến khi kết tủa tan hết (thu được dung dịch phức [Ag(NH₃)₂]OH - Thuốc thử Tollens).',
        requiredReagentId: 'nh3_5',
        actionPrompt: 'Nhấp chai NH₃ 5% đến khi dung dịch hoàn toàn trong suốt',
      },
      {
        stepNumber: 3,
        instruction: 'Thêm tiếp khoảng 2 mL dung dịch Glucose 2% vào ống nghiệm, lắc nhẹ.',
        requiredReagentId: 'glucose_2',
        actionPrompt: 'Nhấp chai Glucose 2% vào thuốc thử Tollens',
      },
      {
        stepNumber: 4,
        instruction: 'Ngâm ống nghiệm vào cốc thủy tinh chứa nước nóng (60-70°C) trong vài phút.',
        requiredEquipment: 'waterbath',
        actionPrompt: 'Nhấp nút "Ngâm Cốc Nước Nóng (65°C)"',
      }
    ],
    phenomenon: 'Thành trong của ống nghiệm dần xuất hiện một lớp kim loại bạc (Ag) màu xám sáng bóng bám vào như gương.',
    chemicalExplanation: 'Nhóm aldehyde (-CHO) trong Glucose bị oxi hóa bởi phức bạc Tollens [Ag(NH₃)₂]OH tạo thành Ammonium Gluconate và giải phóng kim loại bạc (Ag) kết tinh bám chặt thành thủy tinh. (Fructose cũng phản ứng do chuyển thành Glucose trong môi trường kiềm NH₃).',
    chemicalEquation: 'CH₂OH[CHOH]₄CHO + 2[Ag(NH₃)₂]OH -(t°)→ CH₂OH[CHOH]₄COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
    simplifiedEquation: 'Glucose + 2[Ag(NH₃)₂]OH -(t°)→ Ammonium Gluconate + 2Ag↓ (sáng bóng) + 3NH₃ + H₂O',
    distinguishingNote: 'Phản ứng tráng bạc được ứng dụng trong công nghiệp sản xuất gương soi và tráng ruột phích (bình giữ nhiệt).',
    resultLiquidColor: 'rgba(226, 232, 240, 0.5)',
    resultPrecipitate: {
      color: '#cbd5e1',
      label: 'Lớp bạc kim loại Ag (Tráng gương)',
      type: 'silver-mirror'
    }
  },
  {
    id: 'exp4_bromine_water',
    title: 'Thí nghiệm 4: Phản ứng với Nước Bromine (Br₂)',
    subTitle: 'Phản ứng PHÂN BIỆT Glucose và Fructose!',
    badge: 'Đặc trưng SGK T23',
    targetCarbohydrate: 'glucose',
    objective: 'Chứng minh Glucose làm mất màu nước Bromine, còn Fructose không làm mất màu nước Bromine.',
    reagentsNeeded: ['br2_water', 'glucose_2', 'fructose_2'],
    equipmentNeeded: ['pipette', 'shake'],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cho khoảng 1 mL nước Bromine (màu đỏ nâu đặc trưng) vào cả Ống nghiệm 1 và Ống nghiệm 2.',
        requiredReagentId: 'br2_water',
        actionPrompt: 'Nhấp chai Nước Bromine (màu đỏ nâu) để thêm vào các ống nghiệm',
      },
      {
        stepNumber: 2,
        instruction: 'Cho 2 mL Glucose vào Ống 1, cho 2 mL Fructose vào Ống 2 để làm thí nghiệm so sánh đối chứng.',
        requiredReagentId: 'glucose_2',
        actionPrompt: 'Thêm dung dịch Glucose vào Ống 1 và Fructose vào Ống 2',
      },
      {
        stepNumber: 3,
        instruction: 'Lắc nhẹ hai ống nghiệm và quan sát màu sắc: Ống 1 Glucose mất màu đỏ nâu, Ống 2 Fructose giữ nguyên màu đỏ nâu.',
        requiredEquipment: 'shake',
        actionPrompt: 'Nhấp nút "Lắc Đều" để quan sát sự mất màu',
      }
    ],
    phenomenon: 'Ống 1 (Glucose): Dung dịch nước bromine chuyển từ màu đỏ nâu sang TRONG SUỐT HOÀN TOÀN (mất màu). Ống 2 (Fructose): Dung dịch GIỮ NGUYÊN MÀU ĐỎ NÂU ban đầu.',
    chemicalExplanation: 'Nước bromine chứa môi trường axit yếu/trung tính, không có môi trường kiềm nên Fructose không thể chuyển hóa thành Glucose. Do đó, chỉ có nhóm -CHO của Glucose bị oxi hóa bởi Br₂ thành Gluconic acid, làm mất màu nước Bromine. Đây là phản ứng quan trọng nhất để PHÂN BIỆT Glucose và Fructose!',
    chemicalEquation: 'CH₂OH[CHOH]₄CHO + Br₂ + H₂O → CH₂OH[CHOH]₄COOH + 2HBr',
    simplifiedEquation: 'Glucose (làm mất màu Br₂) + Br₂ + H₂O → Gluconic acid + 2HBr',
    distinguishingNote: '⚠️ BÀI HỌC CỐT LÕI: Dùng nước Bromine để phân biệt Glucose (mất màu) và Fructose (không mất màu)!',
    resultLiquidColor: 'rgba(241, 245, 249, 0.4)', // Decolorized / transparent
    resultPrecipitate: undefined
  },
  {
    id: 'exp5_fermentation',
    title: 'Thí nghiệm 5: Phản ứng Lên Men Glucose',
    subTitle: 'Sản xuất Ethanol và CO₂ trong đời sống',
    badge: 'SGK Trang 23',
    targetCarbohydrate: 'glucose',
    objective: 'Ủ dung dịch Glucose với men rượu ở 30-35°C để quan sát sự thoát khí CO₂ làm đục nước vôi trong.',
    reagentsNeeded: ['glucose_2', 'yeast_enzyme', 'limewater'],
    equipmentNeeded: ['pipette', 'waterbath'],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cho 5 mL dung dịch Glucose 2% vào ống nghiệm.',
        requiredReagentId: 'glucose_2',
        actionPrompt: 'Nhấp chai Glucose 2% thêm vào ống nghiệm',
      },
      {
        stepNumber: 2,
        instruction: 'Thêm khoảng 1 mL hỗn dịch men rượu (enzyme zymase) vào ống nghiệm.',
        requiredReagentId: 'yeast_enzyme',
        actionPrompt: 'Nhấp chai Men Rượu / Enzyme',
      },
      {
        stepNumber: 3,
        instruction: 'Ủ ấm ống nghiệm ở 30-35°C và dẫn khí thoát ra qua cốc chứa dung dịch nước vôi trong Ca(OH)₂.',
        requiredEquipment: 'waterbath',
        actionPrompt: 'Nhấp nút "Ủ Ấm (32°C)" để kích hoạt enzyme',
      }
    ],
    phenomenon: 'Trong ống nghiệm có nhiều bọt khí sủi lên liên tục. Khí CO₂ dẫn qua cốc nước vôi trong làm dung dịch Ca(OH)₂ xuất hiện váng đục trắng CaCO₃.',
    chemicalExplanation: 'Dưới tác dụng của enzyme có trong men rượu ở nhiệt độ thích hợp (30-35°C), phân tử Glucose bị lên men phân hủy tạo thành Alcohol ethylic (Ethanol) và giải phóng khí Carbon dioxide (CO₂).',
    chemicalEquation: 'C₆H₁₂O₆ -(enzyme, 30-35°C)→ 2C₂H₅OH + 2CO₂↑',
    simplifiedEquation: 'Glucose -(men rượu)→ 2 Ethanol + 2 CO₂↑ (sủi bọt khí)',
    distinguishingNote: 'Phản ứng lên men Glucose là cơ sở sản xuất rượu, bia, bánh mì, cồn sinh học y tế và nhiên liệu sinh học E5.',
    resultLiquidColor: 'rgba(254, 243, 199, 0.6)',
    resultPrecipitate: {
      color: '#ffffff',
      label: 'Váng đục CaCO₃ trong cốc nước vôi',
      type: 'turbid-limewater'
    },
    hasBubbles: true
  }
];

export const MOLECULES: MoleculeInfo[] = [
  {
    id: 'glucose_open',
    name: 'Glucose (Mạch hở)',
    formula: 'CH₂OH-[CHOH]₄-CHO',
    type: 'open',
    carbohydrate: 'glucose',
    functionalGroups: [
      {
        name: 'Nhóm Aldehyde (-CHO)',
        formula: '-CH=O',
        description: 'Tại carbon số 1 (C1). Quyết định tính chất oxi hóa (tráng bạc, tác dụng Cu(OH)₂ đun nóng, làm mất màu Br₂).',
        color: '#ef4444' // red
      },
      {
        name: '5 Nhóm Hydroxy (-OH)',
        formula: '-OH (C2, C3, C4, C5, C6)',
        description: '5 nhóm hydroxy liền kề tạo tính chất của polyalcohol (hòa tan Cu(OH)₂ ở nhiệt độ thường tạo phức màu xanh lam).',
        color: '#3b82f6' // blue
      }
    ],
    description: 'Glucose ở dạng mạch hở chứa 5 nhóm hydroxy (-OH) và 1 nhóm aldehyde (-CHO). Trong dung dịch nước, chỉ có khoảng 0.003% Glucose tồn tại ở dạng mạch hở.'
  },
  {
    id: 'glucose_ring_alpha',
    name: 'α-Glucose (Mạch vòng 6 cạnh)',
    formula: 'C₆H₁₂O₆ (dạng vòng α-pyranose)',
    type: 'ring-alpha',
    carbohydrate: 'glucose',
    functionalGroups: [
      {
        name: 'Nhóm -OH Hemiacetal',
        formula: '-OH tại C1',
        description: 'Nhóm -OH đặc biệt hình thành do phản ứng cộng nội phân tử giữa -OH ở C5 với nhóm -CHO ở C1. Ở dạng α, nhóm -OH hemiacetal nằm ở phía dưới mặt phẳng vòng.',
        color: '#10b981' // green
      }
    ],
    description: 'Trong dung dịch nước, Glucose tồn tại chủ yếu ở dạng vòng 6 cạnh. Dạng α-Glucose chiếm khoảng 36% ở trạng thái cân bằng.'
  },
  {
    id: 'glucose_ring_beta',
    name: 'β-Glucose (Mạch vòng 6 cạnh)',
    formula: 'C₆H₁₂O₆ (dạng vòng β-pyranose)',
    type: 'ring-beta',
    carbohydrate: 'glucose',
    functionalGroups: [
      {
        name: 'Nhóm -OH Hemiacetal',
        formula: '-OH tại C1',
        description: 'Nhóm -OH hemiacetal nằm ở phía trên mặt phẳng vòng. Tác dụng với CH₃OH/HCl khô tạo methyl β-glucoside.',
        color: '#10b981'
      }
    ],
    description: 'Dạng β-Glucose là dạng bền vững nhất trong dung dịch, chiếm khoảng 64% ở trạng thái cân bằng dung dịch.'
  },
  {
    id: 'fructose_open',
    name: 'Fructose (Mạch hở)',
    formula: 'CH₂OH-[CHOH]₃-CO-CH₂OH',
    type: 'open',
    carbohydrate: 'fructose',
    functionalGroups: [
      {
        name: 'Nhóm Ketone (>C=O)',
        formula: '-CO- tại C2',
        description: 'Nhóm chức ketone tại vị trí carbon số 2. Không phản ứng trực tiếp với nước bromine.',
        color: '#f59e0b' // amber
      },
      {
        name: '5 Nhóm Hydroxy (-OH)',
        formula: '-OH (C1, C3, C4, C5, C6)',
        description: '5 nhóm hydroxy polyalcohol hòa tan Cu(OH)₂ ở nhiệt độ thường.',
        color: '#3b82f6'
      }
    ],
    description: 'Fructose dạng mạch hở là một polyhydroxyketone chứa 5 nhóm -OH và 1 nhóm ketone (>C=O tại C2).'
  },
  {
    id: 'fructose_ring_alpha',
    name: 'α-Fructose (Mạch vòng 5 cạnh)',
    formula: 'C₆H₁₂O₆ (dạng vòng α-furanose)',
    type: 'ring-alpha',
    carbohydrate: 'fructose',
    functionalGroups: [
      {
        name: 'Nhóm -OH Hemiketal',
        formula: '-OH tại C2',
        description: 'Nhóm -OH hemiketal tại C2 hình thành từ sự khép vòng giữa -OH ở C5 và nhóm C=O ở C2.',
        color: '#8b5cf6' // purple
      }
    ],
    description: 'Trong dung dịch, Fructose tồn tại ở các dạng vòng 5 cạnh (furanose) và 6 cạnh (pyranose).'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Công thức phân tử chung của Glucose và Fructose là gì?',
    options: ['C₆H₁₀O₅', 'C₆H₁₂O₆', 'C₁₂H₂₂O₁₁', 'C₆H₁₄O₆'],
    correctAnswer: 1,
    explanation: 'Cả Glucose và Fructose đều là monosaccharide có cùng công thức phân tử là C₆H₁₂O₆ (đồng phân của nhau).',
    difficulty: 'Nhận biết'
  },
  {
    id: 2,
    question: 'Để phân biệt hai dung dịch Glucose và Fructose mất nhãn, thuốc thử nào sau đây là tối ưu nhất?',
    options: ['Dung dịch Cu(OH)₂ ở nhiệt độ thường', 'Thuốc thử Tollens [Ag(NH₃)₂]OH', 'Dung dịch Nước Bromine (Br₂)', 'Dung dịch NaOH nóng'],
    correctAnswer: 2,
    explanation: 'Dung dịch nước Bromine phản ứng oxi hóa Glucose (làm mất màu vàng cam), còn Fructose không phản ứng (không làm mất màu). Thuốc thử Tollens và Cu(OH)₂ trong môi trường kiềm đều phản ứng với cả 2 chất do Fructose chuyển hóa thành Glucose.',
    difficulty: 'Thông hiểu'
  },
  {
    id: 3,
    question: 'Hiện tượng xảy ra khi cho dung dịch Glucose tác dụng với Cu(OH)₂ ở nhiệt độ thường là gì?',
    options: [
      'Xuất hiện kết tủa màu đỏ gạch Cu₂O',
      'Kết tủa tan, tạo dung dịch phức màu xanh lam tươi',
      'Có khí màu nâu đỏ thoát ra',
      'Lớp kim loại bạc sáng bóng bám vào thành ống nghiệm'
    ],
    correctAnswer: 1,
    explanation: 'Glucose chứa 5 nhóm -OH liền kề (tính chất polyalcohol) nên ở nhiệt độ thường hòa tan Cu(OH)₂ tạo thành dung dịch phức màu xanh lam tươi (C₆H₁₁O₆)₂Cu.',
    difficulty: 'Nhận biết'
  },
  {
    id: 4,
    question: 'Tại sao Fructose không chứa nhóm aldehyde (-CHO) nhưng vẫn tham gia phản ứng tráng bạc với thuốc thử Tollens?',
    options: [
      'Vì Fructose có tính khử mạnh hơn Glucose',
      'Vì trong môi trường kiềm (NH₃/NaOH), Fructose chuyển hóa thành Glucose',
      'Vì nhóm ketone (-CO-) phản ứng trực tiếp với Ag⁺',
      'Vì Fructose có 5 nhóm -OH liền kề'
    ],
    correctAnswer: 1,
    explanation: 'Trong môi trường kiềm như NH₃ hoặc NaOH, Glucose và Fructose chuyển hóa thuận nghịch cho nhau: Glucose ⇌ Fructose (môi trường OH⁻). Do đó Fructose cũng thể hiện phản ứng tráng bạc.',
    difficulty: 'Thông hiểu'
  },
  {
    id: 5,
    question: 'Khi đun nóng ống nghiệm chứa dung dịch Glucose với Cu(OH)₂ trong môi trường NaOH, sản phẩm kết tủa thu được là chất nào?',
    options: ['Cu (Màu đỏ)', 'CuO (Màu đen)', 'Cu₂O (Màu đỏ gạch)', 'CuOH (Màu xanh)'],
    correctAnswer: 2,
    explanation: 'Khi đun nóng, nhóm -CHO của Glucose bị oxi hóa, Cu(II) bị khử thành Cu(I) dưới dạng kết tủa Copper(I) oxide Cu₂O có màu đỏ gạch.',
    difficulty: 'Nhận biết'
  },
  {
    id: 6,
    question: 'Phương trình lên men Glucose thành Alcohol ethylic (Ethanol) giải phóng khí gì?',
    options: ['Khí H₂', 'Khí CO₂', 'Khí O₂', 'Khí CH₄'],
    correctAnswer: 1,
    explanation: 'Phương trình lên men: C₆H₁₂O₆ -(enzyme, 30-35°C)→ 2C₂H₅OH + 2CO₂↑. Khí CO₂ thoát ra làm đục nước vôi trong.',
    difficulty: 'Nhận biết'
  },
  {
    id: 7,
    question: 'Trong máu người bình thường, nồng độ Glucose được duy trì ổn định ở mức khoảng bao nhiêu?',
    options: ['0.1% (khoảng 4.4 - 7.2 mmol/L)', '1.0% (khoảng 10 - 15 mmol/L)', '5.0%', '0.01%'],
    correctAnswer: 0,
    explanation: 'Nồng độ glucose trong máu người khỏe mạnh lúc đói duy trì ổn định khoảng 4.4 - 7.2 mmol/L (tương đương khoảng 0.1% hay 80 - 130 mg/dL).',
    difficulty: 'Thông hiểu'
  },
  {
    id: 8,
    question: 'Chất nào sau đây được dùng làm dung dịch truyền tĩnh mạch (dịch truyền ngọt) giải độc và cung cấp năng lượng nhanh cho người bệnh?',
    options: ['Dung dịch Fructose 20%', 'Dung dịch Glucose 5%', 'Dung dịch Saccharose 10%', 'Dung dịch Tinh bột 5%'],
    correctAnswer: 1,
    explanation: 'Dung dịch Glucose 5% là dung dịch đẳng trương được dùng phổ biến để truyền tĩnh mạch trực tiếp cho bệnh nhân suy nhược, mất nước, hạ đường huyết.',
    difficulty: 'Vận dụng'
  }
];

export const APPLICATIONS = [
  {
    title: 'Y Tế & Chăm Sóc Sức Khỏe',
    description: 'Dung dịch glucose 5% làm dịch truyền tĩnh mạch trực tiếp bổ sung năng lượng nhanh chóng cho bệnh nhân. Cung cấp năng lượng cho tế bào thông qua hô hấp tế bào.',
    icon: 'Activity'
  },
  {
    title: 'Công Nghiệp Thực Phẩm',
    description: 'Glucose và fructose là chất làm ngọt tự nhiên trong bánh kẹo, nước giải khát, mứt, đồ đóng hộp. Fructose có độ ngọt cao gấp 1.5 lần sucrose, thường có trong mật ong.',
    icon: 'Utensils'
  },
  {
    title: 'Công Nghiệp Tráng Gương & Phích',
    description: 'Phản ứng tráng bạc của glucose được ứng dụng để tráng ruột bình giữ nhiệt (phích nước) và tráng gương soi an toàn hơn so với dùng aldehyde độc hại.',
    icon: 'Sparkles'
  },
  {
    title: 'Sản Xuất Nhiên Liệu Sinh Học',
    description: 'Lên men glucose từ nguyên liệu nông nghiệp (sắn, ngô, mía) để sản xuất Ethanol sinh học (xăng E5, cồn y tế 70°, 90°).',
    icon: 'Zap'
  }
];
