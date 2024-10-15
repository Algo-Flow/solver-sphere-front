from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import subprocess
import uuid
import os

# 플라스크 + SQL알케미
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///submissions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class SubmissionResult(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    result = db.Column(db.String(120), nullable=False)

# 지원하는 프로그래밍 언어에 대한 실행 명령어
LANGUAGE_COMMANDS = {
    "python": ["python3"],
    "javascript": ["node"]
    # 추후 추가가능!
}

# 데이터베이스 초기화 (앱 컨텍스트 내에서 실행)
with app.app_context():
    db.create_all()

# 코드를 실행하고 결과를 비교하는 함수
############################################
# 1. 코드를 API로 받아옴
# 2. 파일을 생성하고, 인터프리터를 통해 실행
# 3. 실행 결과를 비교하여 리턴
############################################
def check_solution(submitted_code, intended_output, language):
    try:
        # 고유한 제출 ID 생성 = GUID
        submission_id = str(uuid.uuid4())
        code_filename = f"{submission_id}.{language}"

        # 파일에 제출된 코드 저장
        with open(code_filename, "w") as f:
            f.write(submitted_code)

        # 언어에 맞는 실행 명령어 선택
        command = LANGUAGE_COMMANDS.get(language)
        if not command:
            return None, "Error: Unsupported language"

        # 제출된 코드를 실행
        result = subprocess.run(
            command + [code_filename],
            capture_output=True,
            text=True,
            timeout=5  # 실행 시간 제한 (초)
        )

        # 결과 비교
        if result.stdout == intended_output:
            return submission_id, "Correct"
        else:
            return submission_id, f"Wrong: {result.stdout.strip()}"

    except subprocess.TimeoutExpired:
        return None, "Error: Time limit exceeded"
    except Exception as e:
        return None, f"Error: {str(e)}"
    finally:
        # 실행된 코드 파일 삭제
        # 파일 이름은 GUID.python, GUID.js 등으로 생성됨
        if os.path.exists(code_filename):
            os.remove(code_filename)

# 코드 제출 API
@app.route('/submit_code', methods=['POST'])
def submit_code():
    data = request.json
    submitted_code = data.get("code")
    intended_output = data.get("intended_output")
    language = data.get("language")

    if not submitted_code or not intended_output or not language:
        return jsonify({"error": "Code, intended output, and language are required"}), 400

    submission_id, result = check_solution(submitted_code, intended_output, language)

    if submission_id:
        # 제출 결과를 데이터베이스에 저장
        submission = SubmissionResult(id=submission_id, result=result)
        db.session.add(submission)
        db.session.commit()
        return jsonify({"submission_id": submission_id, "result": result}), 200
    else:
        return jsonify({"error": result}), 400

# 제출 결과 조회 API
@app.route('/result/<submission_id>', methods=['GET'])
def get_result(submission_id):
    submission = SubmissionResult.query.get(submission_id)

    if submission:
        return jsonify({"submission_id": submission_id, "result": submission.result}), 200
    else:
        return jsonify({"error": "Submission not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
