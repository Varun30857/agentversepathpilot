import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from services.profile_service import analyze_profile


class ProfileServiceTests(unittest.TestCase):
    def test_profile_service_handles_missing_api_key(self):
        file_obj = type('DummyFile', (), {'file': None})

        with self.assertRaises(ValueError):
            import asyncio
            asyncio.run(analyze_profile(file_obj))

    def test_groq_fallback_analysis_returns_frontend_fields(self):
        from services.groq_service import _fallback_analysis

        result = _fallback_analysis(
            "Jane Doe\nEmail: jane.doe@example.com\nPhone: 555-1234\nSkills: Python, React, FastAPI\nProjects: Resume analyzer app\nEducation: BSc Computer Science\nCertifications: AWS Certified Solutions Architect"
        )

        self.assertEqual(result['name'], 'Jane Doe')
        self.assertEqual(result['email'], '')
        self.assertEqual(result['phone'], '')
        self.assertIsInstance(result['skills'], list)
        self.assertIsInstance(result['technical_skills'], list)
        self.assertIsInstance(result['education'], list)
        self.assertIsInstance(result['projects'], list)
        self.assertIsInstance(result['certifications'], list)
        self.assertIsInstance(result['improvement_suggestions'], list)
        self.assertIsInstance(result['suggestions'], list)


if __name__ == '__main__':
    unittest.main()