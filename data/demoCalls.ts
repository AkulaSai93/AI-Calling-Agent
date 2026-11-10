// Sample demo calls shown in the "Hear Voxa on a real call" section.
// Copy, companies and stats are placeholders — swap for real ones.
// To play a real recording, add `audio` (a file in /public) and an `at` (seconds) on every line.

export type LangCode = "en" | "hi" | "ta" | "te";

export const languages: { code: LangCode; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "hi", label: "Hindi", native: "हिं" },
  { code: "ta", label: "Tamil", native: "த" },
  { code: "te", label: "Telugu", native: "తె" },
];

export type Line = { from: "agent" | "customer"; text: string; at?: number };

export type DemoCall = {
  id: string;
  label: string;
  company: string;
  customer: string;
  direction: "Outbound" | "Inbound";
  outcome: string;
  stat: { value: string; label: string };
  audio?: Partial<Record<LangCode, string>>;
  scripts: Record<LangCode, Line[]>;
};

export const AGENT_NAME = "Aria";

export const calls: DemoCall[] = [
  {
    id: "loan-sales",
    label: "Loan sales",
    company: "Apex Finance",
    customer: "Rahul",
    direction: "Outbound",
    outcome: "KYC link sent",
    stat: { value: "3.2×", label: "more qualified leads" },
    scripts: {
      en: [
        { from: "agent", text: "Hi Rahul, this is Aria from Apex Finance. You checked a personal loan on our app yesterday — is now a good time?" },
        { from: "customer", text: "Yes, tell me. What's the interest rate?" },
        { from: "agent", text: "You're pre-approved for up to ₹5 lakh at 10.5% a year, with zero paperwork. Would you like the money in your account today?" },
        { from: "customer", text: "Okay, what do I need to do?" },
        { from: "agent", text: "I'm sending a secure link to your WhatsApp now — just confirm your PAN and you're done in two minutes." },
      ],
      hi: [
        { from: "agent", text: "नमस्ते राहुल जी, मैं Apex Finance से आरिया बोल रही हूँ। आपने कल हमारे ऐप पर पर्सनल लोन चेक किया था — क्या अभी बात हो सकती है?" },
        { from: "customer", text: "हाँ, बताइए। ब्याज दर क्या है?" },
        { from: "agent", text: "आप ₹5 लाख तक के लिए प्री-अप्रूव्ड हैं, सिर्फ़ 10.5% सालाना पर, बिना किसी पेपरवर्क के। क्या आज ही पैसा आपके खाते में चाहिए?" },
        { from: "customer", text: "ठीक है, मुझे क्या करना होगा?" },
        { from: "agent", text: "मैं अभी आपके WhatsApp पर एक सुरक्षित लिंक भेज रही हूँ — बस PAN कन्फ़र्म कीजिए, दो मिनट में काम हो जाएगा।" },
      ],
      ta: [
        { from: "agent", text: "வணக்கம் ராகுல், நான் Apex Finance-இலிருந்து ஆரியா பேசுகிறேன். நேற்று எங்கள் ஆப்பில் பர்சனல் லோன் பார்த்தீர்கள் — இப்போது பேசலாமா?" },
        { from: "customer", text: "சரி, சொல்லுங்கள். வட்டி விகிதம் என்ன?" },
        { from: "agent", text: "உங்களுக்கு ₹5 லட்சம் வரை 10.5% ஆண்டு வட்டியில் முன் அனுமதி உள்ளது, எந்த ஆவணமும் தேவையில்லை. இன்றே பணம் வேண்டுமா?" },
        { from: "customer", text: "சரி, நான் என்ன செய்ய வேண்டும்?" },
        { from: "agent", text: "உங்கள் WhatsApp-க்கு ஒரு பாதுகாப்பான லிங்க் அனுப்புகிறேன் — PAN-ஐ உறுதிசெய்தால் இரண்டு நிமிடத்தில் முடிந்துவிடும்." },
      ],
      te: [
        { from: "agent", text: "నమస్కారం రాహుల్ గారు, నేను Apex Finance నుండి ఆరియా మాట్లాడుతున్నాను. నిన్న మా యాప్‌లో పర్సనల్ లోన్ చూశారు — ఇప్పుడు మాట్లాడవచ్చా?" },
        { from: "customer", text: "సరే, చెప్పండి. వడ్డీ రేటు ఎంత?" },
        { from: "agent", text: "మీకు ₹5 లక్షల వరకు 10.5% వార్షిక వడ్డీతో ప్రీ-అప్రూవల్ ఉంది, ఎలాంటి పేపర్‌వర్క్ అవసరం లేదు. ఈరోజే డబ్బు కావాలా?" },
        { from: "customer", text: "సరే, నేను ఏం చేయాలి?" },
        { from: "agent", text: "మీ WhatsApp కి ఒక సురక్షితమైన లింక్ పంపుతున్నాను — PAN నిర్ధారిస్తే రెండు నిమిషాల్లో పూర్తవుతుంది." },
      ],
    },
  },
  {
    id: "collections",
    label: "Payment reminders",
    company: "Apex Finance",
    customer: "Priya",
    direction: "Outbound",
    outcome: "Payment scheduled",
    stat: { value: "41%", label: "faster recoveries" },
    scripts: {
      en: [
        { from: "agent", text: "Hi Priya, this is Aria from Apex Finance. Your EMI of ₹4,200 was due on the 5th — just a quick reminder." },
        { from: "customer", text: "Oh, I completely forgot. My salary comes in on the 12th." },
        { from: "agent", text: "No problem at all. Shall I schedule the payment for the 12th so there's no late fee?" },
        { from: "customer", text: "Yes, please do that." },
        { from: "agent", text: "Done — it's set for the 12th and I've sent a confirmation by SMS. Have a great day!" },
      ],
      hi: [
        { from: "agent", text: "नमस्ते प्रिया जी, मैं Apex Finance से आरिया बोल रही हूँ। आपकी ₹4,200 की EMI 5 तारीख़ को ड्यू थी — बस याद दिलाने के लिए कॉल किया।" },
        { from: "customer", text: "अरे, मैं बिल्कुल भूल गई। मेरी सैलरी 12 तारीख़ को आती है।" },
        { from: "agent", text: "कोई बात नहीं। क्या मैं पेमेंट 12 तारीख़ के लिए शेड्यूल कर दूँ, ताकि कोई लेट फ़ीस न लगे?" },
        { from: "customer", text: "हाँ, कर दीजिए।" },
        { from: "agent", text: "हो गया — 12 तारीख़ के लिए सेट कर दिया है और SMS पर कन्फ़र्मेशन भेज दिया है। आपका दिन शुभ हो!" },
      ],
      ta: [
        { from: "agent", text: "வணக்கம் பிரியா, நான் Apex Finance-இலிருந்து ஆரியா பேசுகிறேன். உங்கள் ₹4,200 EMI 5-ஆம் தேதி செலுத்த வேண்டியிருந்தது — நினைவூட்டவே அழைத்தேன்." },
        { from: "customer", text: "ஐயோ, முற்றிலும் மறந்துவிட்டேன். என் சம்பளம் 12-ஆம் தேதி வரும்." },
        { from: "agent", text: "பரவாயில்லை. தாமதக் கட்டணம் வராமல் இருக்க, 12-ஆம் தேதிக்கு பணம் செலுத்துவதை திட்டமிடட்டுமா?" },
        { from: "customer", text: "ஆம், அப்படியே செய்யுங்கள்." },
        { from: "agent", text: "முடிந்தது — 12-ஆம் தேதிக்கு அமைத்து, SMS-இல் உறுதிப்படுத்தல் அனுப்பியுள்ளேன். நல்ல நாளாக அமையட்டும்!" },
      ],
      te: [
        { from: "agent", text: "నమస్కారం ప్రియ గారు, నేను Apex Finance నుండి ఆరియా మాట్లాడుతున్నాను. మీ ₹4,200 EMI 5వ తేదీన చెల్లించాల్సి ఉంది — గుర్తు చేయడానికి కాల్ చేశాను." },
        { from: "customer", text: "అయ్యో, పూర్తిగా మర్చిపోయాను. నా జీతం 12వ తేదీన వస్తుంది." },
        { from: "agent", text: "పర్వాలేదు. లేట్ ఫీజు పడకుండా 12వ తేదీకి పేమెంట్ షెడ్యూల్ చేయనా?" },
        { from: "customer", text: "అవును, చేయండి." },
        { from: "agent", text: "అయిపోయింది — 12వ తేదీకి సెట్ చేసి, SMS లో కన్ఫర్మేషన్ పంపాను. మంచి రోజు గడపండి!" },
      ],
    },
  },
  {
    id: "support",
    label: "Customer support",
    company: "ShopEase",
    customer: "Arjun",
    direction: "Inbound",
    outcome: "Delivery rescheduled",
    stat: { value: "88%", label: "resolved without a human" },
    scripts: {
      en: [
        { from: "agent", text: "Thanks for calling ShopEase, this is Aria. How can I help you today?" },
        { from: "customer", text: "My order hasn't arrived. It was supposed to come yesterday." },
        { from: "agent", text: "Sorry about that, Arjun. Order #48213 is out for delivery and will reach you today before 6 PM." },
        { from: "customer", text: "I won't be home today. Can it come tomorrow?" },
        { from: "agent", text: "Done — I've moved it to tomorrow, 10 AM to 1 PM, and waived the delivery fee for the delay." },
      ],
      hi: [
        { from: "agent", text: "ShopEase में कॉल करने के लिए धन्यवाद, मैं आरिया बोल रही हूँ। मैं आपकी क्या मदद कर सकती हूँ?" },
        { from: "customer", text: "मेरा ऑर्डर अभी तक नहीं आया। कल आना था।" },
        { from: "agent", text: "माफ़ कीजिए अर्जुन जी। ऑर्डर #48213 आउट फ़ॉर डिलीवरी है और आज शाम 6 बजे से पहले पहुँच जाएगा।" },
        { from: "customer", text: "मैं आज घर पर नहीं हूँ। क्या कल आ सकता है?" },
        { from: "agent", text: "हो गया — मैंने इसे कल सुबह 10 से 1 बजे के बीच कर दिया है, और देरी के लिए डिलीवरी चार्ज भी माफ़ कर दिया है।" },
      ],
      ta: [
        { from: "agent", text: "ShopEase-ஐ அழைத்ததற்கு நன்றி, நான் ஆரியா. உங்களுக்கு எப்படி உதவலாம்?" },
        { from: "customer", text: "என் ஆர்டர் இன்னும் வரவில்லை. நேற்றே வந்திருக்க வேண்டும்." },
        { from: "agent", text: "மன்னிக்கவும் அர்ஜுன். ஆர்டர் #48213 இன்று டெலிவரிக்கு புறப்பட்டுவிட்டது, மாலை 6 மணிக்குள் வந்துவிடும்." },
        { from: "customer", text: "இன்று நான் வீட்டில் இல்லை. நாளை வர முடியுமா?" },
        { from: "agent", text: "முடிந்தது — நாளை காலை 10 முதல் 1 மணிக்குள் மாற்றிவிட்டேன், தாமதத்திற்காக டெலிவரி கட்டணத்தையும் தள்ளுபடி செய்துவிட்டேன்." },
      ],
      te: [
        { from: "agent", text: "ShopEase కి కాల్ చేసినందుకు ధన్యవాదాలు, నేను ఆరియా. మీకు ఎలా సహాయం చేయగలను?" },
        { from: "customer", text: "నా ఆర్డర్ ఇంకా రాలేదు. నిన్ననే రావాల్సింది." },
        { from: "agent", text: "క్షమించండి అర్జున్ గారు. ఆర్డర్ #48213 ఈరోజు డెలివరీకి బయలుదేరింది, సాయంత్రం 6 లోపు వస్తుంది." },
        { from: "customer", text: "ఈరోజు నేను ఇంట్లో ఉండను. రేపు రావచ్చా?" },
        { from: "agent", text: "అయిపోయింది — రేపు ఉదయం 10 నుండి 1 మధ్యకు మార్చాను, ఆలస్యానికి డెలివరీ ఛార్జీ కూడా మాఫీ చేశాను." },
      ],
    },
  },
  {
    id: "appointments",
    label: "Appointment booking",
    company: "CareFirst Clinic",
    customer: "Meera",
    direction: "Outbound",
    outcome: "Appointment booked",
    stat: { value: "62%", label: "fewer no-shows" },
    scripts: {
      en: [
        { from: "agent", text: "Hi Meera, this is Aria from CareFirst Clinic. Dr. Rao asked us to book your follow-up — does this week work?" },
        { from: "customer", text: "Yes, but only in the evening." },
        { from: "agent", text: "Dr. Rao is free at 6:30 PM on Thursday or 7 PM on Friday. Which suits you better?" },
        { from: "customer", text: "Thursday works." },
        { from: "agent", text: "You're booked for Thursday at 6:30 PM. I'll send a WhatsApp reminder on the morning of your visit." },
      ],
      hi: [
        { from: "agent", text: "नमस्ते मीरा जी, मैं CareFirst Clinic से आरिया बोल रही हूँ। डॉ. राव ने आपका फ़ॉलो-अप बुक करने को कहा है — क्या इस हफ़्ते ठीक रहेगा?" },
        { from: "customer", text: "हाँ, लेकिन सिर्फ़ शाम को।" },
        { from: "agent", text: "डॉ. राव गुरुवार शाम 6:30 या शुक्रवार शाम 7 बजे उपलब्ध हैं। आपके लिए कौन-सा ठीक रहेगा?" },
        { from: "customer", text: "गुरुवार ठीक है।" },
        { from: "agent", text: "आपकी अपॉइंटमेंट गुरुवार शाम 6:30 बजे बुक हो गई है। विज़िट वाले दिन सुबह WhatsApp पर रिमाइंडर भेज दूँगी।" },
      ],
      ta: [
        { from: "agent", text: "வணக்கம் மீரா, நான் CareFirst Clinic-இலிருந்து ஆரியா. டாக்டர் ராவ் உங்கள் ஃபாலோ-அப்பை புக் செய்யச் சொன்னார் — இந்த வாரம் சரியா?" },
        { from: "customer", text: "சரி, ஆனால் மாலையில் மட்டும்." },
        { from: "agent", text: "டாக்டர் ராவ் வியாழன் மாலை 6:30 அல்லது வெள்ளி மாலை 7 மணிக்கு இருக்கிறார். எது உங்களுக்கு வசதி?" },
        { from: "customer", text: "வியாழன் சரி." },
        { from: "agent", text: "வியாழன் மாலை 6:30-க்கு புக் செய்துவிட்டேன். வருகை நாள் காலையில் WhatsApp-இல் நினைவூட்டல் அனுப்புகிறேன்." },
      ],
      te: [
        { from: "agent", text: "నమస్కారం మీరా గారు, నేను CareFirst Clinic నుండి ఆరియా. డాక్టర్ రావు గారు మీ ఫాలో-అప్ బుక్ చేయమన్నారు — ఈ వారం కుదురుతుందా?" },
        { from: "customer", text: "సరే, కానీ సాయంత్రం మాత్రమే." },
        { from: "agent", text: "డాక్టర్ రావు గురువారం సాయంత్రం 6:30 లేదా శుక్రవారం రాత్రి 7 గంటలకు అందుబాటులో ఉన్నారు. మీకు ఏది సౌకర్యం?" },
        { from: "customer", text: "గురువారం సరిపోతుంది." },
        { from: "agent", text: "గురువారం సాయంత్రం 6:30 కి బుక్ చేశాను. విజిట్ రోజు ఉదయం WhatsApp లో రిమైండర్ పంపుతాను." },
      ],
    },
  },
];

// Shown in the language strip under the demo
export const spokenLanguages = [
  { glyph: "A", name: "English" },
  { glyph: "ह", name: "Hindi" },
  { glyph: "த", name: "Tamil" },
  { glyph: "త", name: "Telugu" },
  { glyph: "ಕ", name: "Kannada" },
  { glyph: "ळ", name: "Marathi" },
  { glyph: "മ", name: "Malayalam" },
  { glyph: "ગુ", name: "Gujarati" },
  { glyph: "বা", name: "Bengali" },
  { glyph: "ਪੰ", name: "Punjabi" },
];
