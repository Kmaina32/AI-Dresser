export interface StyleOption {
  id: string;
  name: string;
  prompt: string;
  previewImage?: string;
  tags: string[];
}

export interface StyleCategory {
  category: string;
  styles: StyleOption[];
}

export const CATEGORIZED_SUIT_STYLES: StyleCategory[] = [
  {
    category: 'African Bespoke',
    styles: [
      {
        id: 'nigerian-senator',
        name: 'Nigerian Senator',
        prompt: 'a stylish Nigerian Senator style suit in royal blue with intricate embroidery on the chest',
        previewImage: 'https://images.unsplash.com/photo-1621216124563-384e5a43513e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['cultural', 'regal', 'modern'],
      },
      {
        id: 'brocade-agbada',
        name: 'Brocade Agbada',
        prompt: 'a magnificent white brocade Agbada with intricate gold embroidery, worn over a matching tunic and trousers',
        tags: ['cultural', 'regal', 'ornate', 'ceremony'],
      },
      {
        id: 'senegalese-kaftan',
        name: 'Senegalese Kaftan',
        prompt: 'an elegant, flowing Senegalese kaftan (boubou) made of rich, vibrant Bazin fabric, featuring intricate, tone-on-tone embroidery around the neck and chest. The look should be grand and stately.',
        tags: ['cultural', 'regal', 'ornate', 'ceremony'],
      },
      {
        id: 'kaunda-suit',
        name: 'Kaunda Suit',
        prompt: "a classic Kaunda suit, known for its safari-style jacket with two chest pockets and two lower pockets, paired with matching trousers. The suit should be a sophisticated light grey color, worn with a simple collared shirt underneath.",
        previewImage: 'https://images.unsplash.com/photo-1617137968427-8543702a4926?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['cultural', 'classic', 'business', 'everyday'],
      },
      {
        id: 'tailored-kaftan',
        name: 'Tailored Kaftan',
        prompt: 'a sharp, tailored emerald green kaftan suit with clean lines and subtle silver detailing on the collar',
        tags: ['cultural', 'modern', 'everyday'],
      },
      {
        id: 'modern-dashiki',
        name: 'Modern Dashiki',
        prompt: 'a tailored, modern interpretation of a Dashiki, worn as a stylish suit jacket in black with gold embroidery',
        tags: ['cultural', 'modern', 'bold'],
      },
      {
        id: 'south-african-madiba-shirt',
        name: 'South African Madiba Shirt',
        prompt: 'a stylish and iconic Madiba shirt, known for its vibrant, colourful silk fabric and batik or print patterns. The shirt should be worn unbuttoned at the collar for a relaxed yet presidential look.',
        tags: ['cultural', 'everyday', 'bold'],
      },
      {
        id: 'congolese-abacost',
        name: 'Congolese "Abacost"',
        prompt: 'a Congolese "Abacost" (À bas le costume), a lightweight, short-sleeved suit worn without a shirt and tie, symbolizing cultural authenticity. The style should be sharp, tailored, and sophisticated.',
        tags: ['cultural', 'classic', 'business'],
      },
      {
        id: 'ankara-print-blazer',
        name: 'Ankara Print Blazer',
        prompt: 'a modern suit featuring a blazer made from vibrant, geometric Ankara print fabric',
        tags: ['cultural', 'modern', 'bold', 'everyday'],
      },
      {
        id: 'kente-cloth-formal',
        name: 'Kente Cloth Formal',
        prompt: 'an elegant formal suit incorporating rich, colorful Ghanaian Kente cloth patterns on the lapels and cuffs',
        tags: ['cultural', 'formal', 'bold', 'ornate', 'ceremony'],
      },
      {
        id: 'mudcloth-blazer',
        name: 'Mudcloth Blazer',
        prompt: 'a contemporary blazer featuring authentic Malian mudcloth patterns in black, white, and earthy tones',
        tags: ['cultural', 'modern', 'classic'],
      },
      {
        id: 'adire-tie-dye-suit',
        name: 'Adire Tie-Dye Suit',
        prompt: 'a vibrant indigo blue suit made from Adire tie-dye fabric, featuring captivating patterns, tailored in a modern slim fit',
        tags: ['cultural', 'modern', 'bold'],
      },
      {
        id: 'ethiopian-suit',
        name: 'Ethiopian Suit',
        prompt: 'a modern, tailored suit made from fine wool, elegantly accented with traditional Ethiopian Tibeb embroidery along the lapels and cuffs. The embroidery should feature intricate geometric patterns.',
        tags: ['cultural', 'classic', 'business', 'ornate'],
      },
      {
        id: 'maasai-shuka-inspired',
        name: 'Maasai Shuka Inspired',
        prompt: 'a bold, modern suit that creatively incorporates the iconic red and black checkered pattern of a Maasai shuka into the design of the blazer',
        tags: ['cultural', 'modern', 'bold'],
      },
      {
        id: 'kikuyu-elder-attire',
        name: 'Kikuyu Elder Attire',
        prompt: "a distinguished Kikuyu elder's attire, featuring a brown Gikuyu shuka wrapped over one shoulder, a beaded necklace, and a traditional headband (muthuru)",
        tags: ['cultural', 'classic', 'ceremony'],
      },
      {
        id: 'zulu-ceremonial-attire',
        name: 'Zulu Ceremonial Attire',
        prompt: 'a powerful Zulu man in ceremonial attire, wearing an Amabheshu (loincloth made of calfskin) and an Umqhele (warrior\'s headband). The look is completed with beaded armbands and anklets, showcasing strength and cultural pride.',
        tags: ['cultural', 'themed', 'ornate', 'ceremony'],
      },
      {
        id: 'presidential-ceremony',
        name: 'Presidential Ceremony',
        prompt: 'a distinguished dark navy suit, worn with a presidential sash featuring the colors of the Kenyan flag, suitable for a national ceremony',
        tags: ['cultural', 'formal', 'classic', 'regal', 'ceremony'],
      },
      {
        id: 'embroidered-coat-of-arms',
        name: 'Embroidered Coat of Arms',
        prompt: 'an elegant black blazer with the Kenyan coat of arms finely embroidered in gold thread on the chest pocket',
        tags: ['cultural', 'formal', 'classic', 'ornate'],
      },
    ]
  },
  {
    category: 'Indian Regal',
    styles: [
      {
        id: 'classic-sherwani',
        name: 'Classic Sherwani',
        prompt: 'a regal cream-colored Sherwani with intricate gold embroidery and a matching turban',
        tags: ['cultural', 'formal', 'regal', 'ornate', 'ceremony'],
      },
      {
        id: 'nehru-jacket-ensemble',
        name: 'Nehru Jacket Ensemble',
        prompt: 'a sophisticated charcoal grey Nehru jacket worn over a crisp white kurta pajama set',
        tags: ['cultural', 'classic', 'everyday', 'business'],
      },
      {
        id: 'jodhpuri-suit-bandhgala',
        name: 'Jodhpuri Suit (Bandhgala)',
        prompt: 'a sharp, royal blue Jodhpuri suit (Bandhgala) with classic metallic buttons',
        tags: ['cultural', 'formal', 'classic'],
      },
      {
        id: 'silk-kurta-jacket-set',
        name: 'Silk Kurta Jacket Set',
        prompt: 'an elegant silk kurta in deep maroon, paired with a contrasting beige brocade jacket',
        tags: ['cultural', 'formal', 'ornate'],
      },
      {
        id: 'modern-pathani-suit',
        name: 'Modern Pathani Suit',
        prompt: 'a stylish black Pathani suit with a modern, tailored fit and silver buttons',
        tags: ['cultural', 'modern', 'everyday'],
      },
    ]
  },
  {
    category: 'Arabic Attire',
    styles: [
      {
        id: 'classic-white-thobe-ghutra',
        name: 'Classic White Thobe & Ghutra',
        prompt: 'a pristine white Thobe (Dishdasha) with a matching white Ghutra and black Agal, exuding timeless elegance',
        tags: ['cultural', 'classic', 'regal', 'ceremony'],
      },
      {
        id: 'embroidered-black-bisht',
        name: 'Embroidered Black Bisht',
        prompt: 'a luxurious black Bisht cloak with intricate gold embroidery along the edges, worn over a crisp white Thobe',
        tags: ['cultural', 'formal', 'regal', 'ornate', 'ceremony'],
      },
      {
        id: 'modern-emirati-kandura',
        name: 'Modern Emirati Kandura',
        prompt: 'a modern, tailored Emirati Kandura in a sophisticated sandy beige color with subtle tassel (Tarbousha) detailing',
        tags: ['cultural', 'modern', 'everyday'],
      },
      {
        id: 'striped-moroccan-djellaba',
        name: 'Striped Moroccan Djellaba',
        prompt: 'a stylish Moroccan Djellaba with subtle grey and white vertical stripes, a pointed hood (qob), and a relaxed yet refined fit',
        tags: ['cultural', 'classic', 'everyday'],
      },
      {
        id: 'formal-saudi-thobe',
        name: 'Formal Saudi Thobe',
        prompt: 'a formal Saudi-style Thobe in a slightly off-white color, with structured cuffs and a high collar, projecting an air of authority',
        tags: ['cultural', 'formal', 'classic', 'business'],
      },
    ]
  },
  {
    category: 'Service Uniforms',
    styles: [
      {
        id: 'decorated-army-general',
        name: 'Decorated Army General',
        prompt: 'a photorealistic, highly decorated US Army General\'s Army Green Service Uniform (AGSU), displaying a full rack of medals and ribbons on the chest, with four-star general insignia on the shoulders. The uniform should be perfectly pressed and tailored.',
        tags: ['themed', 'classic', 'formal'],
      },
      {
        id: 'navy-officer-dress-whites',
        name: 'Navy Officer (Dress Whites)',
        prompt: 'a photorealistic depiction of a US Navy officer in a crisp, immaculate summer dress white uniform. The uniform includes a choke-collar tunic, officer\'s white combination cap, and hard shoulder boards indicating rank. The fabric should look like pristine white cotton.',
        tags: ['themed', 'classic', 'formal'],
      },
      {
        id: 'air-force-pilot',
        name: 'Air Force Pilot',
        prompt: 'a photorealistic image of a modern US Air Force pilot wearing a sage green CWU 27/P flight suit, complete with mission patches and a helmet under their arm. The pilot is standing confidently in front of an F-22 Raptor fighter jet on a sunlit tarmac.',
        tags: ['themed', 'modern'],
      },
      {
        id: 'modern-combat-uniform',
        name: 'Modern Combat Uniform',
        prompt: 'a soldier in a modern US Army combat uniform with the Operational Camouflage Pattern (OCP). They are equipped with a full set of tactical gear, including a plate carrier, helmet with night vision mount, and a rifle. The image should be gritty and realistic.',
        tags: ['themed', 'modern'],
      },
      {
        id: 'nypd-police-officer',
        name: 'NYPD Police Officer',
        prompt: 'a photorealistic image of a New York Police Department (NYPD) officer in their standard dark blue duty uniform. The uniform includes a police shirt with patches on the sleeves, a tie, and a peaked cap with the NYPD insignia. The overall look is professional and authoritative.',
        tags: ['themed', 'classic'],
      },
      {
        id: 'british-bobby-police',
        name: 'British "Bobby" Police',
        prompt: 'a classic British "Bobby" on patrol, wearing the traditional dark blue police uniform. The uniform is distinguished by the iconic custodian helmet, a polished silver whistle chain, and epaulettes on the shoulders. The image should evoke a sense of timeless British policing.',
        tags: ['themed', 'classic'],
      },
      {
        id: 'canadian-mountie-rcmp',
        name: 'Canadian Mountie (RCMP)',
        prompt: 'a photorealistic portrait of a Royal Canadian Mounted Police (RCMP) officer in the iconic Red Serge ceremonial uniform. The image showcases the scarlet tunic, midnight blue breeches, brown leather riding boots, and the wide-brimmed Stetson hat. The officer should have a professional and proud demeanor.',
        tags: ['themed', 'classic', 'formal', 'ceremony'],
      },
      {
        id: 'supreme-court-justice',
        name: 'Supreme Court Justice',
        prompt: 'a distinguished US Supreme Court Justice wearing a traditional, high-quality black wool judicial robe. The robe should have full, flowing sleeves and a simple, elegant design, portraying a sense of wisdom and authority. The setting should suggest a courthouse or chambers.',
        tags: ['themed', 'classic', 'formal', 'business'],
      },
      {
        id: 'british-judge',
        name: 'British Judge',
        prompt: 'a traditional British High Court judge in full ceremonial court dress. This includes a long black robe, a white winged collar with bands (jabot), and a meticulously detailed, full-bottomed horsehair wig. The image should capture the gravitas and tradition of the British judiciary.',
        tags: ['themed', 'classic', 'formal', 'ornate', 'business'],
      },
    ]
  },
  {
    category: 'Capes and Robes',
    styles: [
      {
        id: 'dynamic-superhero-cape',
        name: 'Dynamic Superhero Cape',
        prompt: 'a dramatic, flowing red superhero cape made of a heavy, high-quality fabric, billowing dynamically in the wind as if ready for flight. The cape should be attached to a sleek, modern superhero suit.',
        previewImage: 'https://images.unsplash.com/photo-1569411997091-3482b36371e4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['themed', 'modern', 'bold'],
      },
      {
        id: 'enchanted-wizard-robe',
        name: 'Enchanted Wizard Robe',
        prompt: 'an ancient and mystical wizard robe in deep midnight blue, adorned with glowing silver runes and constellations. The fabric should look like heavy velvet, and the sleeves should be long and wide.',
        tags: ['themed', 'ornate', 'classic'],
      },
      {
        id: 'regal-royal-mantle',
        name: 'Regal Royal Mantle',
        prompt: 'a magnificent, full-length royal mantle made of deep crimson velvet, trimmed with thick, realistic white ermine fur. The mantle is fastened at the neck with an ornate golden clasp.',
        tags: ['themed', 'regal', 'ornate', 'classic', 'formal'],
      },
      {
        id: 'futuristic-sci-fi-cloak',
        name: 'Futuristic Sci-Fi Cloak',
        prompt: 'a sleek, futuristic hooded cloak made from a dark, high-tech fabric with subtle, integrated glowing blue circuitry patterns. The cloak should have a sharp, angular design and a mysterious feel.',
        tags: ['themed', 'modern'],
      }
    ]
  },
  {
    category: 'Victorian Era',
    styles: [
        {
            id: 'gentlemans-frock-coat',
            name: 'Gentleman\'s Frock Coat',
            prompt: 'a distinguished gentleman in a classic Victorian black wool frock coat, a crisp white shirt with a high collar, a formal ascot tie, a patterned waistcoat, and grey striped trousers. The look should be formal and sophisticated, reminiscent of the late 19th century.',
            previewImage: 'https://images.unsplash.com/photo-1608633352321-634d57053334?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            tags: ['themed', 'classic', 'formal'],
        },
        {
            id: 'formal-morning-suit',
            name: 'Formal Morning Suit',
            prompt: 'an aristocratic gentleman wearing a formal Victorian morning suit, featuring a black or grey cutaway tailcoat, a light-colored waistcoat, and striped trousers. The outfit is completed with a top hat and gloves.',
            tags: ['themed', 'classic', 'formal'],
        },
        {
            id: 'tweed-norfolk-jacket',
            name: 'Tweed Norfolk Jacket',
            prompt: 'a rugged gentleman in a classic Victorian tweed Norfolk jacket, known for its single-breasted front and distinctive box pleats. Paired with matching knickerbockers, wool socks, and sturdy boots, suitable for a country estate.',
            tags: ['themed', 'classic', 'everyday'],
        },
    ]
  },
  {
      category: 'Medieval',
      styles: [
          {
              id: 'knight-in-shining-armor',
              name: 'Knight in Shining Armor',
              prompt: 'a valiant medieval knight in a full suit of polished steel plate armor, including a helmet with a visor. The armor is intricately detailed and worn over a chainmail coif and a padded gambeson. The knight should look battle-ready and noble.',
              previewImage: 'https://images.unsplash.com/photo-1596726134224-b8d9991b55a0?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              tags: ['themed', 'classic'],
          },
          {
              id: 'noblemans-tunic',
              name: 'Nobleman\'s Tunic',
              prompt: 'a wealthy medieval nobleman wearing a luxurious, floor-length tunic (houppelande) made of rich, deep blue velvet and lined with fur. The tunic is cinched at the waist with a decorative leather belt, and he wears soft leather shoes.',
              tags: ['themed', 'classic', 'regal', 'ornate'],
          },
          {
              id: 'peasants-attire-male',
              name: 'Peasant\'s Attire',
              prompt: 'a humble medieval peasant man dressed in simple, practical clothing: a loose-fitting, earth-toned linen tunic, rough woolen trousers (braies) tied at the calf, and simple leather turn-shoes. The clothes are well-worn but clean.',
              tags: ['themed', 'classic', 'everyday'],
          },
      ]
  },
  {
      category: 'Roaring Twenties',
      styles: [
          {
              id: 'gangster-pinstripe-suit',
              name: 'Gangster Pinstripe Suit',
              prompt: 'a sharp-dressed 1920s gangster in a bold, dark pinstripe double-breasted suit. The look is completed with a fedora hat tilted at an angle, a silk tie, and shiny spats over his shoes, exuding an air of confidence and danger.',
              previewImage: 'https://images.unsplash.com/photo-1586024845399-235f33e08f4c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              tags: ['themed', 'classic', 'bold'],
          },
          {
              id: 'gatsby-style-tuxedo',
              name: 'Gatsby-style Tuxedo',
              prompt: 'a dapper gentleman at a lavish 1920s party, wearing an immaculate white dinner jacket tuxedo, a crisp white shirt with a black bow tie, and black trousers. His hair is slicked back, and he holds a champagne coupe, embodying the spirit of the Jazz Age.',
              tags: ['themed', 'formal', 'classic', 'ornate'],
          },
          {
              id: 'newsboy-outfit',
              name: 'Newsboy Outfit',
              prompt: 'a working-class man from the 1920s, wearing a classic "newsboy" or "flat cap", a simple button-up shirt with a waistcoat, baggy tweed trousers, and sturdy work boots. The look should be authentic and rustic.',
              tags: ['themed', 'classic', 'everyday'],
          },
      ]
  },
  {
    category: 'Western Classics',
    styles: [
      {
        id: 'classic-tuxedo',
        name: 'Classic Tuxedo',
        prompt: 'a classic black tuxedo with a bow tie',
        previewImage: 'https://images.unsplash.com/photo-1593005510365-a2252a81881a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['western', 'formal', 'classic', 'event'],
      },
      {
        id: 'navy-business-suit',
        name: 'Navy Business',
        prompt: 'a modern navy blue business suit with a white shirt and a tie',
        tags: ['western', 'business', 'classic'],
      },
      {
        id: 'charcoal-pinstripe-suit',
        name: 'Charcoal Pinstripe',
        prompt: 'a sharp charcoal grey pinstripe suit',
        tags: ['western', 'business', 'classic', 'bold'],
      },
      {
        id: 'summer-linen-suit',
        name: 'Summer Linen',
        prompt: 'a lightweight beige summer linen suit',
        tags: ['western', 'everyday', 'classic'],
      },
      {
        id: 'velvet-dinner-jacket',
        name: 'Velvet Dinner Jacket',
        prompt: 'a luxurious deep burgundy velvet dinner jacket',
        tags: ['western', 'formal', 'ornate', 'bold'],
      },
      {
        id: 'tweed-jacket',
        name: 'Tweed Jacket',
        prompt: 'a classic brown tweed sports jacket with elbow patches',
        tags: ['western', 'everyday', 'classic'],
      },
      {
        id: 'modern-slim-fit-suit',
        name: 'Modern Slim Fit',
        prompt: 'a sleek, modern slim-fit gray suit',
        tags: ['western', 'modern', 'business', 'everyday'],
      },
      {
        id: 'double-breasted-suit',
        name: 'Double Breasted',
        prompt: 'a powerful double-breasted suit in royal blue',
        tags: ['western', 'business', 'classic', 'bold'],
      },
      {
        id: 'white-dinner-jacket',
        name: 'White Dinner Jacket',
        prompt: 'an elegant white dinner jacket with black trousers, James Bond style',
        tags: ['western', 'formal', 'classic', 'bold'],
      },
      {
        id: 'bold-plaid-suit',
        name: 'Bold Plaid',
        prompt: 'a fashionable and bold plaid suit with a complementary tie',
        tags: ['western', 'modern', 'bold', 'everyday'],
      },
      {
        id: 'light-grey-wool-suit',
        name: 'Light Grey Wool',
        prompt: 'a versatile light grey wool suit, perfect for business or casual events',
        tags: ['western', 'business', 'everyday', 'classic'],
      },
      {
        id: 'classic-three-piece-suit',
        name: 'Classic Three-Piece',
        prompt: 'a classic charcoal grey three-piece suit with a waistcoat',
        tags: ['western', 'business', 'classic', 'formal'],
      },
      {
        id: 'summer-seersucker-suit',
        name: 'Summer Seersucker',
        prompt: 'a light blue and white striped seersucker suit, ideal for a summer event',
        tags: ['western', 'everyday', 'classic'],
      },
      {
        id: 'emerald-green-corduroy-suit',
        name: 'Emerald Green Corduroy',
        prompt: 'a stylish emerald green corduroy suit with a modern cut',
        tags: ['western', 'modern', 'bold', 'everyday'],
      },
      {
        id: 'midnight-blue-shawl-lapel',
        name: 'Midnight Blue Shawl Lapel',
        prompt: 'an elegant midnight blue tuxedo with a satin shawl lapel',
        tags: ['western', 'formal', 'classic'],
      },
      {
        id: 'brown-checkered-wool-suit',
        name: 'Brown Checkered Wool',
        prompt: 'a sophisticated light brown checkered wool suit',
        tags: ['western', 'business', 'classic'],
      },
      {
        id: 'silver-gray-sharkskin-suit',
        name: 'Silver-Gray Sharkskin',
        prompt: 'a retro-style silver-gray sharkskin suit with a subtle sheen',
        tags: ['western', 'classic', 'modern'],
      },
      {
        id: 'crimson-red-peak-lapel-suit',
        name: 'Crimson Red Peak Lapel',
        prompt: 'a bold crimson red suit with sharp peak lapels',
        tags: ['western', 'modern', 'bold', 'formal'],
      },
      {
        id: 'lawyers-gown-wig',
        name: "Lawyer's Gown & Wig",
        prompt: "a traditional black barrister's court gown worn over a white shirt with bands, complete with a classic white horsehair barrister's wig",
        tags: ['themed', 'classic', 'formal', 'business'],
      },
    ]
  },
  {
    category: 'Smart Casual & Old Money',
    styles: [
      {
        id: 'tshirt-trousers-loafers',
        name: 'T-Shirt & Tailored Trousers',
        prompt: 'a sophisticated casual look featuring a high-quality, plain white crew-neck t-shirt tucked into perfectly tailored dark navy trousers, paired with classic brown leather loafers. The outfit should look relaxed yet polished.',
        previewImage: 'https://images.unsplash.com/photo-1594499468122-818a7b3b7a8a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['western', 'everyday', 'modern', 'classic'],
      },
      {
        id: 'checkered-trousers-polo',
        name: 'Checkered Trousers & Polo',
        prompt: 'a stylish outfit featuring bold, tailored checkered trousers (tartan or Prince of Wales check), paired with a solid-colored black polo shirt and minimalist white sneakers. The focus is on the statement trousers.',
        previewImage: 'https://images.unsplash.com/photo-1552346154-78593a1c2a1e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['western', 'everyday', 'modern', 'bold'],
      },
      {
        id: 'old-money-linen',
        name: 'Coastal Linen Look',
        prompt: "an effortless 'old money' aesthetic, featuring a crisp white linen shirt with the sleeves casually rolled up, paired with beige chinos and suede driving moccasins. The setting should evoke a relaxed, luxurious coastal vibe.",
        previewImage: 'https://images.unsplash.com/photo-1623354272195-92687c4f1c14?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['western', 'classic', 'everyday', 'regal'],
      },
      {
        id: 'old-money-knit',
        name: 'Ivy League Knit',
        prompt: "a classic 'old money' style featuring a cream-colored cable-knit sweater elegantly draped over the shoulders of a light blue Oxford shirt, paired with classic khaki trousers and leather boat shoes. The look should be preppy and sophisticated.",
        previewImage: 'https://images.unsplash.com/photo-1622234127928-1b9f72004273?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['western', 'classic', 'everyday'],
      },
      {
        id: 'old-money-waxed-jacket',
        name: 'Countryside Waxed Jacket',
        prompt: "a timeless 'old money' countryside look, featuring a classic dark green waxed cotton jacket layered over a cashmere crewneck sweater, paired with tailored corduroy trousers and leather country boots. The aesthetic is understated, practical, and luxurious.",
        previewImage: 'https://images.unsplash.com/photo-1635728632837-70233481fb12?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['western', 'classic', 'everyday', 'regal'],
      },
      {
        id: 'old-money-tweed-coat',
        name: 'Tweed Sport Coat',
        prompt: "a sophisticated 'old money' academic look, centered around a perfectly tailored brown herringbone tweed sport coat. It's worn over a crisp light blue button-down shirt and grey flannel trousers, accessorized with classic leather brogues.",
        previewImage: 'https://images.unsplash.com/photo-1593510987184-899c4201d167?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['western', 'classic', 'business', 'everyday'],
      },
      {
        id: 'old-money-polo-classic',
        name: 'Polo Classic',
        prompt: "a sharp 'old money' look suitable for a polo match, featuring crisp white trousers, a classic navy blue blazer with brass buttons, and a pristine white polo shirt underneath. The look is clean, athletic, and effortlessly elegant.",
        previewImage: 'https://images.unsplash.com/photo-1551028198-333a9b1c723f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['western', 'classic', 'everyday', 'regal'],
      },
      {
        id: 'golf-attire',
        name: 'Golf Attire',
        prompt: 'a classic golf outfit, featuring a crisp polo shirt and tailored golf shorts, suitable for a day on the course. The look should be clean, athletic, and stylish.',
        previewImage: 'https://images.unsplash.com/photo-1594751543129-796918d91b7d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['western', 'classic', 'everyday'],
      },
    ]
  }
];

export const CATEGORIZED_WOMENS_STYLES: StyleCategory[] = [
  {
    category: 'African Bespoke',
    styles: [
      { id: 'vibrant-ankara-gown', name: 'Vibrant Ankara Gown', prompt: "a woman wearing a beautiful, floor-length gown made from vibrant, geometric Ankara print fabric", previewImage: 'https://images.unsplash.com/photo-1608428212933-24765b4c8038?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tags: ['cultural', 'bold', 'ornate', 'formal', 'everyday', 'ceremony'] },
      { id: 'ethiopian-habesha-kemis', name: 'Ethiopian Habesha Kemis', prompt: "a woman wearing a traditional, elegant Ethiopian Habesha Kemis, a white, hand-woven cotton dress with intricate, colorful Tibeb embroidery around the neckline, cuffs, and hem.", tags: ['cultural', 'classic', 'ornate', 'ceremony'] },
      { id: 'south-african-shweshwe-dress', name: 'South African Shweshwe Dress', prompt: "a woman in a stunning, modern dress made from traditional South African Shweshwe fabric, featuring its iconic geometric prints in a deep indigo blue. The dress should have a contemporary silhouette.", tags: ['cultural', 'modern', 'bold', 'everyday'] },
      { id: 'rwandan-mushanana', name: 'Rwandan Mushanana', prompt: "a woman gracefully draped in a Rwandan Mushanana, a traditional ceremonial outfit consisting of a sash of fabric draped over one shoulder, worn over a full-length skirt. The fabric should be a light, flowing material in a vibrant color.", tags: ['cultural', 'classic', 'regal', 'ceremony'] },
      { id: 'herero-otjize-dress', name: 'Herero Otjize Dress', prompt: "a woman wearing the magnificent, Victorian-era-inspired Herero dress from Namibia. The outfit features a vibrant, floor-length gown with many petticoats, a matching high, horned headdress (Otjikaiva), and shawls pinned with brooches.", tags: ['cultural', 'classic', 'ornate', 'bold', 'ceremony'] },
      { id: 'zulu-umabo-attire', name: 'Zulu Umabo Attire', prompt: "a woman in traditional Zulu bridal attire (Umabo), featuring a flared leather skirt (Isidwaba), a magnificent flared red headdress (Isicholo), and colorful beadwork necklaces and bracelets, representing cultural heritage and celebration.", tags: ['cultural', 'classic', 'ornate', 'ceremony'] },
      { id: 'kikuyu-muthirigu-dress', name: 'Kikuyu Mūthirigũ Dress', prompt: "a woman wearing a graceful, traditional Kikuyu woman's dress (Mūthirigũ) made of soft leather, decorated with cowrie shells and colorful beads", tags: ['cultural', 'classic', 'ceremony'] },
      { id: 'modern-kikuyu-shuka-dress', name: 'Modern Kikuyu Shuka Dress', prompt: "a woman wearing a stylish, modern knee-length dress made from the iconic brown Gikuyu shuka fabric, tailored with a contemporary fit", tags: ['cultural', 'modern', 'everyday'] },
    ]
  },
  {
    category: 'Modern & Chic',
    styles: [
      { id: 'elegant-jumpsuit', name: 'Elegant Jumpsuit', prompt: "a woman wearing a chic, wide-leg navy blue jumpsuit with a belted waist", tags: ['western', 'modern', 'everyday', 'business'] },
      { id: 'satin-slip-dress', name: 'Satin Slip Dress', prompt: "a woman wearing a luxurious emerald green satin slip dress", tags: ['western', 'modern', 'formal'] },
      { id: 'tweed-skirt-suit', name: 'Tweed Skirt Suit', prompt: "a woman wearing a classic, stylish pink tweed jacket and matching skirt set", tags: ['western', 'classic', 'business'] },
      { id: 'leather-biker-jacket', name: 'Leather Biker Jacket', prompt: "a woman wearing a cool black leather biker jacket over a white t-shirt", tags: ['western', 'modern', 'everyday', 'bold'] },
    ]
  },
  {
    category: 'Business & Formal',
    styles: [
      { id: 'power-pantsuit', name: 'Power Pantsuit', prompt: "a woman wearing a sharp, tailored white power pantsuit with peak lapels", previewImage: 'https://images.unsplash.com/photo-1581403341630-a382c7a61a0d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tags: ['western', 'business', 'modern', 'bold'] },
      { id: 'classic-sheath-dress', name: 'Classic Sheath Dress', prompt: "a woman wearing a sophisticated black sheath dress, perfect for the office", tags: ['western', 'business', 'classic'] },
      { id: 'evening-gown', name: 'Evening Gown', prompt: "a woman wearing a stunning, floor-length red carpet evening gown with sequin details", tags: ['western', 'formal', 'ornate', 'regal'] },
      { id: 'blazer-and-trousers', name: 'Blazer & Trousers', prompt: "a woman wearing a professional yet stylish combination of a camel-colored blazer and black trousers", tags: ['western', 'business', 'classic', 'everyday'] },
    ]
  },
  {
    category: 'Swimwear & Beachwear',
    styles: [
      { id: 'classic-triangle-bikini', name: 'Classic Triangle Bikini', prompt: "a woman wearing a classic, stylish black triangle bikini, perfect for a sunny day at the beach", previewImage: 'https://images.unsplash.com/photo-1573855619003-97b47d6d4e53?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tags: ['western', 'everyday', 'themed'] },
      { id: 'high-waisted-bikini', name: 'High-Waisted Bikini', prompt: "a woman wearing a fashionable, retro-inspired high-waisted bikini with a vibrant floral pattern", previewImage: 'https://images.unsplash.com/photo-1617653291934-0a3b2a1a8c8e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tags: ['western', 'modern', 'bold', 'themed'] },
    ]
  },
  {
    category: 'Athleisure & Activewear',
    styles: [
      { id: 'sleek-bodysuit', name: 'Sleek Bodysuit', prompt: "a woman wearing a sleek, form-fitting black long-sleeve bodysuit, paired with stylish high-waisted jeans", previewImage: 'https://images.unsplash.com/photo-1603561081539-2b0a3c26a5a0?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tags: ['western', 'modern', 'everyday'] },
      { id: 'yoga-pants-outfit', name: 'Yoga Pants & Top', prompt: "a woman wearing a comfortable and stylish athleisure outfit, featuring high-waisted black yoga pants and a matching sports crop top", previewImage: 'https://images.unsplash.com/photo-1549576490-929208d141c2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tags: ['western', 'everyday', 'modern'] },
    ]
  },
  {
    category: 'Cultural & Traditional',
    styles: [
      { id: 'elegant-saree', name: 'Elegant Saree', prompt: "a woman wearing a gorgeous, flowing silk saree in royal blue and gold", tags: ['cultural', 'formal', 'classic', 'ornate', 'regal', 'ceremony'] },
      { id: 'modern-kimono', name: 'Modern Kimono', prompt: "a woman wearing a modern, stylish kimono jacket with a floral pattern over a simple outfit", tags: ['cultural', 'modern', 'everyday'] },
      { id: 'bohemian-maxi-dress', name: 'Bohemian Maxi Dress', prompt: "a woman wearing a flowy, bohemian-style maxi dress with intricate patterns", tags: ['western', 'everyday', 'themed'] },
    ]
  },
  {
    category: 'Capes and Robes',
    styles: [
      {
        id: 'dynamic-superhero-cape-womens',
        name: 'Dynamic Superhero Cape',
        prompt: 'a dramatic, flowing red superhero cape made of a heavy, high-quality fabric, billowing dynamically in the wind as if ready for flight. The cape should be attached to a sleek, modern superhero suit.',
        previewImage: 'https://images.unsplash.com/photo-1569411997091-3482b36371e4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['themed', 'modern', 'bold'],
      },
      {
        id: 'enchanted-wizard-robe-womens',
        name: 'Enchanted Wizard Robe',
        prompt: 'an ancient and mystical wizard robe in deep midnight blue, adorned with glowing silver runes and constellations. The fabric should look like heavy velvet, and the sleeves should be long and wide.',
        tags: ['themed', 'classic', 'ornate'],
      },
      {
        id: 'regal-royal-mantle-womens',
        name: 'Regal Royal Mantle',
        prompt: 'a magnificent, full-length royal mantle made of deep crimson velvet, trimmed with thick, realistic white ermine fur. The mantle is fastened at the neck with an ornate golden clasp.',
        tags: ['themed', 'classic', 'formal', 'regal', 'ornate'],
      },
      {
        id: 'futuristic-sci-fi-cloak-womens',
        name: 'Futuristic Sci-Fi Cloak',
        prompt: 'a sleek, futuristic hooded cloak made from a dark, high-tech fabric with subtle, integrated glowing blue circuitry patterns. The cloak should have a sharp, angular design and a mysterious feel.',
        tags: ['themed', 'modern'],
      }
    ]
  },
  {
    category: 'Victorian Era',
    styles: [
        {
            id: 'elegant-bustle-gown',
            name: 'Elegant Bustle Gown',
            prompt: 'an elegant lady in a high-fashion Victorian gown from the 1880s, featuring a tight bodice, a narrow front, and a very prominent, heavily draped bustle at the back. The dress is made of rich silk or satin with lace and ribbon details.',
            previewImage: 'https://images.unsplash.com/photo-1568664165913-9a47a126c84b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            tags: ['themed', 'classic', 'formal', 'ornate'],
        },
        {
            id: 'somber-mourning-dress',
            name: 'Somber Mourning Dress',
            prompt: 'a somber Victorian lady in full mourning dress. The gown is made of black crepe fabric, completely unadorned, with a high neckline, long sleeves, and a matching black veil, reflecting the strict etiquette of the era.',
            tags: ['themed', 'classic', 'formal'],
        },
        {
            id: 'tailored-walking-suit-womens',
            name: 'Tailored Walking Suit',
            prompt: 'a fashionable Victorian lady in a tailored walking suit, consisting of a stylish, fitted jacket with a nipped-in waist and a matching long skirt. The outfit is completed with a small, elegant hat, gloves, and a parasol.',
            tags: ['themed', 'classic', 'everyday'],
        },
    ]
  },
  {
      category: 'Medieval',
      styles: [
          {
              id: 'noblewoman-kirtle',
              name: 'Noblewoman\'s Kirtle',
              prompt: 'a graceful medieval noblewoman wearing a fitted, long-sleeved kirtle dress in a rich green color, worn under an elegant, open-sided surcoat (sideless gown) that displays the kirtle beneath. Her hair is styled in intricate braids covered by a delicate veil and circlet.',
              previewImage: 'https://images.unsplash.com/photo-1617268832221-33433145690d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              tags: ['themed', 'classic', 'ornate'],
          },
          {
              id: 'majestic-queens-gown',
              name: 'Majestic Queen\'s Gown',
              prompt: 'a majestic medieval queen on her throne, wearing an opulent gown of crimson brocade with intricate gold embroidery. The gown features long, flowing bell sleeves and a magnificent, heavy train. She wears a golden crown and lavish jewelry.',
              tags: ['themed', 'classic', 'formal', 'regal', 'ornate'],
          },
          {
              id: 'peasant-dress-womens',
              name: 'Peasant Dress',
              prompt: 'a hardworking medieval peasant woman in a simple, practical dress consisting of a long, undyed linen chemise under a sturdy woolen overdress (kirtle). Her hair is covered with a simple coif, and she wears practical leather shoes.',
              tags: ['themed', 'classic', 'everyday'],
          },
      ]
  },
  {
      category: 'Roaring Twenties',
      styles: [
          {
              id: 'beaded-flapper-dress',
              name: 'Beaded Flapper Dress',
              prompt: 'a vibrant, energetic flapper girl from the Roaring Twenties, wearing a short, sleeveless dress adorned with sparkling beads and fringe that swings with movement. She has a short bob hairstyle, a feathered headband, and long pearl necklaces.',
              previewImage: 'https://images.unsplash.com/photo-1552826311-8457787cc399?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              tags: ['themed', 'formal', 'bold', 'ornate'],
          },
          {
              id: 'elegant-evening-gown-20s',
              name: 'Elegant Evening Gown',
              prompt: 'a sophisticated woman in a glamorous, floor-length 1920s evening gown. The dress has a dropped waist, intricate beading in an Art Deco pattern, and is made of a luxurious fabric like silk or velvet. She has an elegant finger-wave hairstyle.',
              tags: ['themed', 'formal', 'classic', 'ornate'],
          },
          {
              id: 'chic-day-dress-20s',
              name: 'Chic Day Dress',
              prompt: 'a stylish woman in a typical 1920s day dress with a dropped waistline and a pleated skirt that ends just below the knee. The dress is made of a lighter fabric like cotton or linen, and she wears a cloche hat and T-strap shoes.',
              tags: ['themed', 'classic', 'everyday'],
          },
      ]
  },
];

export const DEFAULT_SHIRT_OPTION: StyleOption = {
  id: 'original-shirt',
  name: 'Original / Automatic',
  prompt: '',
  tags: [],
};

export const SHIRT_OPTIONS: StyleOption[] = [
  { id: 'white-dress-shirt', name: 'Crisp White Dress Shirt', prompt: 'a crisp white dress shirt', tags: [] },
  { id: 'blue-dress-shirt', name: 'Light Blue Dress Shirt', prompt: 'a light blue dress shirt', tags: [] },
  { id: 'black-dress-shirt', name: 'Black Dress Shirt', prompt: 'a sleek black dress shirt', tags: [] },
  { id: 'striped-dress-shirt', name: 'Striped Dress Shirt', prompt: 'a classic vertically striped dress shirt', tags: [] },
  { id: 'white-oxford-shirt', name: 'White Oxford Button-Down', prompt: 'a casual white Oxford cloth button-down shirt', tags: [] },
  { id: 'black-turtleneck', name: 'Turtleneck (Black)', prompt: 'a sophisticated black turtleneck sweater', tags: [] },
];

export const DEFAULT_TIE_OPTION: StyleOption = {
  id: 'original-tie',
  name: 'Original / No Tie',
  prompt: '',
  tags: [],
};

export const TIE_OPTIONS: StyleOption[] = [
  { id: 'navy-silk-tie', name: 'Classic Silk Tie (Navy)', prompt: 'a classic navy blue silk tie', tags: [] },
  { id: 'red-silk-tie', name: 'Classic Silk Tie (Red)', prompt: 'a power red silk tie', tags: [] },
  { id: 'skinny-black-tie', name: 'Skinny Tie (Black)', prompt: 'a modern, skinny black tie', tags: [] },
  { id: 'black-bow-tie', name: 'Bow Tie (Black)', prompt: 'a classic black bow tie', tags: [] },
  { id: 'burgundy-knit-tie', name: 'Knit Tie (Burgundy)', prompt: 'a stylish burgundy knit tie', tags: [] },
  { id: 'patterned-tie', name: 'Patterned Tie', prompt: 'a tasteful patterned tie that complements the suit', tags: [] },
];

export const BACKGROUND_OPTIONS: StyleOption[] = [
  {
    id: 'original-bg',
    name: 'Original',
    prompt: '', // Empty string means no change
    tags: [],
  },
  {
    id: 'conference-bg',
    name: 'Conference',
    prompt: 'in a professional conference hall with an audience',
    tags: [],
  },
  {
    id: 'wedding-bg',
    name: 'Wedding',
    prompt: 'at an elegant outdoor wedding ceremony',
    tags: [],
  },
  {
    id: 'office-bg',
    name: 'Office',
    prompt: 'in a modern, sunlit corner office with a city view',
    tags: [],
  },
  {
    id: 'with-president-ruto-bg',
    name: 'With President Ruto',
    prompt: 'standing next to Kenyan President William Ruto at an official state house press event',
    tags: [],
  },
  {
    id: 'state-house-kenya-bg',
    name: 'State House, Kenya',
    prompt: 'at the grand entrance of State House in Nairobi, Kenya, with its iconic white facade visible in the background during a sunny day',
    tags: [],
  },
  {
    id: 'kicc-kenya-bg',
    name: 'KICC, Nairobi',
    prompt: 'in front of the Kenyatta International Convention Centre (KICC) in Nairobi, Kenya, with its distinctive cylindrical tower prominently featured against a clear blue sky',
    tags: [],
  },
  {
    id: 'parliament-kenya-bg',
    name: 'Parliament, Kenya',
    prompt: 'outside the historic Parliament Buildings in Nairobi, Kenya, with its well-known clock tower clearly visible in the background',
    tags: [],
  },
  {
    id: 'gala-event-bg',
    name: 'Gala Event',
    prompt: 'at a glamorous black-tie gala event with chandeliers and a red carpet',
    tags: [],
  },
  {
    id: 'rooftop-bar-bg',
    name: 'Rooftop Bar',
    prompt: 'on a chic rooftop bar at night with a stunning city skyline in the background',
    tags: [],
  },
  {
    id: 'art-gallery-bg',
    name: 'Art Gallery',
    prompt: 'inside a modern art gallery, surrounded by contemporary paintings and sculptures',
    tags: [],
  },
  {
    id: 'luxury-car-bg',
    name: 'Luxury Car',
    prompt: 'standing next to a sleek, black luxury sports car in a modern garage',
    tags: [],
  },
  {
    id: 'vintage-library-bg',
    name: 'Vintage Library',
    prompt: 'in a classic, wood-paneled library or study, surrounded by old books',
    tags: [],
  },
];

export const LIGHTING_OPTIONS: StyleOption[] = [
  {
    id: 'original-lighting',
    name: 'Original',
    prompt: '', // Empty string means no change
    tags: [],
  },
  {
    id: 'studio-lighting',
    name: 'Studio Lighting',
    prompt: 'bright, professional studio lighting with soft shadows, highlighting the details of the suit',
    tags: [],
  },
  {
    id: 'golden-hour-lighting',
    name: 'Golden Hour',
    prompt: 'the warm, soft, and directional light of a golden hour sunset',
    tags: [],
  },
  {
    id: 'dramatic-evening-lighting',
    name: 'Dramatic Evening',
    prompt: 'a dramatic, high-contrast evening lighting setup with deep shadows and highlighted edges, creating a moody atmosphere',
    tags: [],
  },
  {
    id: 'natural-daylight-lighting',
    name: 'Natural Daylight',
    prompt: 'neutral and clear natural daylight, as if taken outdoors on a slightly overcast day to avoid harsh shadows',
    tags: [],
  },
];

export const DEFAULT_SHOE_OPTION: StyleOption = {
  id: 'original-shoes',
  name: 'Original',
  prompt: '', // Empty string means no change
  tags: [],
};

export const CATEGORIZED_SHOE_STYLES: StyleCategory[] = [
  {
    category: 'Formal (Oxfords)',
    styles: [
      { id: 'black-oxfords', name: 'Polished Black Leather', prompt: 'classic, highly polished black leather Oxford shoes', tags: [] },
      { id: 'brown-oxfords', name: 'Rich Brown Leather', prompt: 'rich dark brown leather Oxford shoes', tags: [] },
      { id: 'burgundy-oxfords', name: 'Deep Burgundy Leather', prompt: 'deep burgundy (oxblood) leather Oxford shoes', tags: [] },
    ]
  },
  {
    category: 'Business Casual (Brogues & Monk Straps)',
    styles: [
      { id: 'tan-brogues', name: 'Tan Leather Brogues', prompt: 'stylish tan leather brogue shoes with decorative perforations', tags: [] },
      { id: 'suede-brogues', name: 'Chocolate Suede Brogues', prompt: 'chocolate brown suede brogue shoes', tags: [] },
      { id: 'black-monk-straps', name: 'Black Double Monk Straps', prompt: 'sophisticated black leather double monk strap shoes', tags: [] },
      { id: 'cognac-monk-straps', name: 'Cognac Single Monk Straps', prompt: 'elegant cognac-colored single monk strap shoes', tags: [] },
    ]
  },
  {
    category: 'Smart Casual (Loafers & Boots)',
    styles: [
      { id: 'navy-suede-loafers', name: 'Navy Suede Loafers', prompt: 'elegant navy blue suede loafers', tags: [] },
      { id: 'black-penny-loafers', name: 'Black Penny Loafers', prompt: 'classic black leather penny loafers', tags: [] },
      { id: 'brown-chelsea-boots', name: 'Dark Brown Chelsea Boots', prompt: 'sleek dark brown leather Chelsea boots', tags: [] },
      { id: 'grey-chukka-boots', name: 'Grey Suede Chukka Boots', prompt: 'versatile grey suede Chukka boots', tags: [] },
    ]
  }
];

export const CATEGORIZED_WOMENS_SHOE_STYLES: StyleCategory[] = [
  {
    category: 'Heels',
    styles: [
      { id: 'black-pumps', name: 'Classic Black Pumps', prompt: "classic black high-heeled pumps", tags: [] },
      { id: 'nude-stilettos', name: 'Nude Stilettos', prompt: "elegant nude stiletto heels", tags: [] },
      { id: 'red-pumps', name: 'Bold Red Pumps', prompt: "bold red high-heeled pumps", tags: [] },
      { id: 'silver-sandals', name: 'Strappy Sandals (Silver)', prompt: "strappy silver high-heeled sandals", tags: [] },
      { id: 'block-heels', name: 'Chunky Block Heels', prompt: "fashionable chunky block-heeled sandals", tags: [] },
    ]
  },
  {
    category: 'Flats & Boots',
    styles: [
      { id: 'leather-ankle-boots', name: 'Leather Ankle Boots', prompt: "stylish black leather ankle boots", tags: [] },
      { id: 'over-knee-boots', name: 'Over-the-Knee Boots', prompt: "dramatic black suede over-the-knee boots", tags: [] },
      { id: 'tan-ballet-flats', name: 'Ballet Flats (Tan)', prompt: "comfortable and chic tan ballet flats", tags: [] },
      { id: 'brown-knee-high-boots', name: 'Knee-High Boots (Brown)', prompt: "sophisticated brown leather knee-high boots", tags: [] },
      { id: 'espadrille-wedges', name: 'Espadrille Wedges', prompt: "summery espadrille wedge sandals", tags: [] },
    ]
  },
  {
    category: 'Casual & Modern',
    styles: [
      { id: 'white-sneakers', name: 'White Fashion Sneakers', prompt: "clean, minimalist white fashion sneakers", tags: [] },
      { id: 'leather-loafers-womens', name: 'Stylish Loafers', prompt: "classic leather loafers", tags: [] },
      { id: 'platform-sandals', name: 'Platform Sandals', prompt: "trendy platform sandals with a thick sole", tags: [] },
    ]
  }
];

export const DEFAULT_HANDBAG_OPTION: StyleOption = {
  id: 'original-handbag',
  name: 'Original / No Handbag',
  prompt: '',
  tags: [],
};

export const CATEGORIZED_HANDBAG_STYLES: StyleCategory[] = [
  {
    category: 'Elegant Clutches',
    styles: [
      { id: 'black-leather-clutch', name: 'Black Leather Clutch', prompt: 'a chic black leather envelope clutch held elegantly in her hand', tags: [] },
      { id: 'gold-box-clutch', name: 'Gold Box Clutch', prompt: 'a small, sophisticated gold box clutch, perfect for a formal event', tags: [] },
    ]
  },
  {
    category: 'Shoulder & Crossbody',
    styles: [
      { id: 'tan-leather-crossbody', name: 'Tan Leather Crossbody', prompt: 'a stylish tan leather crossbody bag with a long strap', tags: [] },
      { id: 'chain-strap-shoulder-bag', name: 'Chain Strap Shoulder Bag', prompt: 'a classic quilted black shoulder bag with a gold chain strap', tags: [] },
    ]
  },
  {
    category: 'Totes & Everyday Bags',
    styles: [
      { id: 'large-canvas-tote', name: 'Large Canvas Tote', prompt: 'a large, casual canvas tote bag slung over her shoulder', tags: [] },
      { id: 'structured-leather-tote', name: 'Structured Leather Tote', prompt: 'a structured brown leather tote bag suitable for business', tags: [] },
    ]
  },
];

export const DEFAULT_POSTURE_OPTION: StyleOption = {
  id: 'original-posture',
  name: 'Original / Automatic',
  prompt: '',
  tags: [],
};

export const POSTURE_OPTIONS: StyleOption[] = [
  { id: 'power-pose', name: 'Power Pose', prompt: 'standing confidently with hands on hips', tags: [] },
  { id: 'casual-lean', name: 'Casual Lean', prompt: 'casually leaning against a wall or surface', tags: [] },
  { id: 'walking-forward', name: 'Walking Forward', prompt: 'walking confidently towards the camera, in mid-stride', tags: [] },
  { id: 'hands-in-pockets', name: 'Hands in Pockets', prompt: 'standing in a relaxed pose with hands in their pockets', tags: [] },
  { id: 'thoughtful-pose', name: 'Thoughtful Pose', prompt: 'in a thoughtful pose, perhaps with a hand on their chin', tags: [] },
  { id: 'dynamic-action-pose', name: 'Dynamic Action Pose', prompt: 'in a dynamic action pose, as if captured in a moment of movement', tags: [] },
];


export interface QualityOption {
  name: string;
  value: string;
}

export const QUALITY_OPTIONS: QualityOption[] = [
  {
    name: 'Standard',
    value: 'standard',
  },
  {
    name: 'High',
    value: 'high',
  },
];