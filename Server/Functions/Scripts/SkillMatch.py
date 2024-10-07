import sys
import json

def main():
    # Reading arguments passed from Node.js
    # if True:
    if len(sys.argv) > 1:
        extracted_skills = sys.argv[1].split(',')
        required_skills = sys.argv[2].split(',')
        
        extracted_skills_set = set(extracted_skills)
        required_skills_set = set(required_skills)

        # Find intersection
        matched_skills = extracted_skills_set.intersection(required_skills_set)
        # Calculate match percentage
        match_percentage = len(matched_skills) / len(required_skills_set) * 100
    
        data={
            "matchedSkills":list(matched_skills),
            "requiredSkills":list(required_skills),
            "extractedSkills":list(extracted_skills),
            "matchedPercentage":match_percentage,
        }
        print(json.dumps(data))

    

if __name__ == "__main__":
    main()
