import sys
import spacy
import string
import re
import json

nlp = spacy.load('en_core_web_md')

# education info funcation
def education_Info(text):
    text = text.lower()
    doc = nlp(text)
    education_keywords = [
    "bachelor", "master", "ph.d", "phd", "associate", "b.sc", "bachelor's", 
    "master's", "m.sc", "mba", "m.s", "m.a", "high school", "college", 
    "university", "institute", "academy", "school", "degree", "diploma"
]
    education_details = set()
    institutions = set()
    degrees = set()
    for sent in doc.sents:
        if any(keyword.lower() in sent.text.lower() for keyword in education_keywords):
            education_details.add(sent.text.strip())
    # for ent in doc.ents:
    #     if ent.label_ == "ORG" and any(kw in ent.text.lower() for kw in ["university", "college", "institute", "academy", "school"]):
    #         institutions.add(ent.text)
    #     if ent.label_ in ["WORK_OF_ART", "NORP"] and any(kw in ent.text.lower() for kw in education_keywords):
    #       degrees.append(ent.text)
       # Extract educational institutions and degrees
    for ent in doc.ents:
        if ent.label_ == "ORG" and any(kw in ent.text.lower() for kw in ["university", "college", "institute", "academy", "school"]):
            institutions.add(ent.text.strip())
        elif ent.label_ in ["WORK_OF_ART", "NORP", "EDUCATION", "DEGREE"]:  # Adjust entity labels as necessary
            if any(kw in ent.text.lower() for kw in education_keywords):
                degrees.add(ent.text.strip())
    info ={
        "degrees":list(degrees),
        "institutions":list(institutions),
        "education_details":list(education_details)
    }
    return info

# Skills info
# lagacy
def skills_set(text):
    doc = nlp(text)
    skills = set()
    
    # Regular expression to match numbers and punctuation
    punctuations = string.punctuation  # All punctuation characters
    unwanted_chars = re.compile(r'[0-9{}]'.format(re.escape(punctuations)))
    
    # Extract noun chunks
    for chunk in doc.noun_chunks:
        skill = chunk.text.strip()
        # Remove if skill contains numbers, punctuation, or is empty
        clean_skill = unwanted_chars.sub('', skill).strip()
        if clean_skill:  # Add only if the skill is non-empty
            skills.add(clean_skill)
    
    # Extract named entities
    for ent in doc.ents:
        skill = ent.text.strip()
        # Remove if skill contains numbers, punctuation, or is empty
        clean_skill = unwanted_chars.sub('', skill).strip()
        if clean_skill:
            skills.add(clean_skill)
    
    return list(skills)
# LTS
def extract_skills_from_text(text):
    doc = nlp(text)
    
    # Locate the "Skills:" section
    skills_start_idx = text.lower().find("skills :")
    if skills_start_idx != -1:
        # Extract text after "Skills:"
        skills_text = text[skills_start_idx + len("skills:"):].strip()
        
        # Process the skills_text with spaCy
        skills_doc = nlp(skills_text)
        
        # Extract nouns and noun phrases as skills
        extracted_skills = set()
        for token in skills_doc:
            if token.pos_ in ["NOUN", "PROPN"]:  # Extract nouns (NOUN) and proper nouns (PROPN)
                extracted_skills.add(token.text)
                
        return extracted_skills
    else:
        return set()  # Return an empty set if no 'Skills:' section is found
# years of expreicnce
def experience_years(text):
    # Regex pattern to match years of experience (e.g., '10 years', '15+ years', 'over 5 years')
    experience_pattern = r'(\b\d+([+-]?\s*years?|[+-]?\s*months?)\b|\bover\s+\d+\s*years?)'
    # Find all matches in the text
    matches = re.findall(experience_pattern, text, re.IGNORECASE)
    years_of_experience = [match[0] for match in matches]
    return years_of_experience
# title
def extract_titles(text):
    doc = nlp(text)
    job_keywords = [
    # General and Management roles
    "manager", "engineer", "developer", "administrator", "analyst", "consultant",
    "specialist", "coordinator", "director", "technician", "supervisor", "officer",
    "assistant", "executive", "architect", "scientist", "trainer", "strategist",
    "lead", "head", "chief", "president", "vice president", "associate", "advisor",
    "principal", "representative", "administrator", "partner", "facilitator",

    # IT and Technical roles
    "programmer", "full stack developer", "backend developer", "frontend developer",
    "systems engineer", "database administrator", "network engineer", "cybersecurity analyst",
    "data scientist", "data engineer", "machine learning engineer", "ai specialist",
    "cloud architect", "cloud engineer", "devops engineer", "qa engineer", "it manager",
    "software tester", "ux designer", "ui designer", "web developer", "mobile developer",
    "blockchain developer", "site reliability engineer", "product manager", "scrum master",

    # Finance and Accounting roles
    "accountant", "auditor", "financial analyst", "controller", "treasurer", 
    "financial advisor", "tax specialist", "investment analyst", "credit analyst", 
    "payroll specialist", "risk manager", "cost analyst", "budget analyst",

    # Marketing and Sales roles
    "marketing manager", "brand manager", "content strategist", "copywriter",
    "seo specialist", "digital marketing specialist", "social media manager",
    "sales manager", "business development manager", "account manager",
    "account executive", "sales representative", "inside sales representative",
    "outside sales representative", "sales coordinator", "client relations manager",
    "customer success manager", "public relations manager", "media planner",
    "product marketer", "growth marketer",

    # Human Resources roles
    "hr manager", "recruiter", "talent acquisition specialist", "hr generalist",
    "hr coordinator", "training manager", "compensation and benefits specialist",
    "hr analyst", "employee relations specialist", "hr assistant", "payroll manager",

    # Operations and Logistics roles
    "operations manager", "supply chain manager", "logistics coordinator",
    "warehouse manager", "inventory analyst", "procurement specialist",
    "transportation manager", "production manager", "quality assurance manager",
    "fleet manager", "logistics manager", "operations analyst",

    # Healthcare roles
    "nurse", "physician", "doctor", "surgeon", "pharmacist", "therapist",
    "radiologist", "dentist", "medical assistant", "medical coder", "medical biller",
    "paramedic", "healthcare administrator", "public health specialist",
    "occupational therapist", "physical therapist", "lab technician",

    # Education roles
    "teacher", "instructor", "professor", "lecturer", "tutor", "academic advisor",
    "dean", "principal", "educational coordinator", "curriculum specialist",
    "school administrator", "librarian", "researcher", "research assistant",
    "education consultant",

    # Creative and Media roles
    "graphic designer", "art director", "creative director", "copywriter",
    "video editor", "photographer", "videographer", "animator", "illustrator",
    "content creator", "content manager", "social media specialist", "web designer",
    "fashion designer", "interior designer", "makeup artist", "stylist",

    # Science and Engineering roles
    "mechanical engineer", "electrical engineer", "civil engineer", "chemical engineer",
    "biomedical engineer", "environmental engineer", "aerospace engineer",
    "industrial engineer", "structural engineer", "research scientist",
    "chemist", "physicist", "biologist", "lab assistant", "research assistant",
    "agronomist", "geologist", "hydrologist",

    # Legal roles
    "lawyer", "attorney", "paralegal", "legal assistant", "legal secretary",
    "litigation specialist", "corporate counsel", "compliance officer",
    "contract manager", "legal consultant",

    # Customer Service roles
    "customer service representative", "call center agent", "customer support specialist",
    "client service manager", "customer care manager", "technical support specialist",
    "helpdesk analyst", "service desk agent", "support engineer",

    # Hospitality roles
    "chef", "cook", "waiter", "waitress", "bartender", "housekeeper",
    "hotel manager", "concierge", "event planner", "guest service agent",
    "sommelier", "catering manager", "banquet manager", "front desk manager",

    # Construction roles
    "construction manager", "site supervisor", "project engineer", 
    "site manager", "foreman", "bricklayer", "carpenter", "electrician",
    "plumber", "welder", "roofer", "heavy equipment operator", "painter",
    "scaffolder", "quantity surveyor", "civil engineer",

    # Real Estate roles
    "real estate agent", "property manager", "broker", "leasing agent",
    "real estate analyst", "property consultant", "appraiser",

    # Other roles
    "pilot", "flight attendant", "logistics planner", "event coordinator",
    "translator", "interpreter", "freelancer", "entrepreneur", "founder",
    "co-founder", "volunteer coordinator", "maintenance technician",
    "maintenance supervisor", "gardener", "groundskeeper", "security officer",
    "firefighter", "police officer", "postal worker", "delivery driver",
    "truck driver", "chauffeur"
]
    titles = []
    for ent in doc.ents:
        if ent.label_ in ["WORK_OF_ART", "ORG", "PERSON"]:
            if any(keyword.lower() in ent.text.lower() for keyword in job_keywords):
                titles.append(ent.text.strip())

    # Alternatively, look for noun chunks that might represent job titles
    for chunk in doc.noun_chunks:
        if any(keyword.lower() in chunk.text.lower() for keyword in job_keywords):
            titles.append(chunk.text.strip())
    return list(set(titles))  # Return unique titles

def all_Info():
    if len(sys.argv) > 1:
        text = sys.argv[1] 
        
        d={
            "title":    list(extract_titles(text)),
            "education":list(education_Info(text)),
            "skills":   list(extract_skills_from_text(text)),
            # "skills": list(skills_set(text)),
            "exp":      list(experience_years(text))
        }
        print(json.dumps(d)) 
  # piplines







# pipelines
def stop_remove(text):
    doc = nlp(text)
    filtered_text = " ".join([token.text for token in doc if not token.is_stop])
    return filtered_text
  
def clean_text(text):  
    # cleaned_text = re.sub(r'[^\w\s]', '', text) 
    cleaned_text = re.sub(r'[^\w\s@./]', '', text) 
    cleaned_text = cleaned_text.replace('\n', ' ').replace('\r', ' ')
    # cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()
    return cleaned_text   
    
def Data_Pipline(text):
  t =  stop_remove(text)
  t_ = clean_text(t)
  return t_
    
if __name__ == "__main__":
    all_Info()

    
    
    
    
    
    