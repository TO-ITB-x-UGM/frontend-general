import { getAnswerToken } from "../utils/answer";
import service from "../utils/request";

export default class Tryout {
    static baseGroupURL = '/exam';

    /**
     * Untuk mendapatkan daftar tryout yang tersedia untuk dikerjakan
     */
    static async getAttempts() {
        const res = await service.get(`${this.baseGroupURL}/my-attempt`);
        return res;
    }

    /**
     * Untuk mendapatkan informasi mengenai detail tryout
     */
    static async getDetail(exam_id) {
        const res = await service.get(`${this.baseGroupURL}/${exam_id}`);
        return res;
    }

    /**
     * Untuk melihat daftar subtest yang ada
     */
    static async getSubtests(exam_id) {
        const res = await service.get(`${this.baseGroupURL}/subtest?exam=${exam_id}`);
        return res;
    }

    /**
     * Memilih tryout yang akan dikerjakan dan mulai pengerjaan
     */
    static async startAttempt(exam_id) {
        const res = await service.post(`${this.baseGroupURL}/user-attempt`, {
            exam: exam_id
        });
        return res;
    }

    /**
     * Mendapatkan informasi mengenai pengerjaan tryout (global)
     */
    static async getAttempt(attempt_id) {
        const res = await service.get(`${this.baseGroupURL}/attempt/${attempt_id}`);
        return res;
    }

    /**
     * Mulai pengerjaan subtest
     */
    static async startSubattempt(subtest_id, attempt_id) {
        const res = await service.post(`${this.baseGroupURL}/subattempt`, {
            subtest: subtest_id,
            attempt: attempt_id
        });
        return res;
    }

    /**
     * Mendapatkan data pengerjaan subtest (answer_token)
     */
    static async getSubattempt(subattempt_id) {
        const res = await service.get(`${this.baseGroupURL}/subattempt/${subattempt_id}`, {
            answer_token: getAnswerToken()
        });
        return res;
    }

    /**
     * Untuk mendapatkan soal dan pilihan jawaban
     */
    static async getQuestions(subattempt_id) {
        const res = await service.get(`${this.baseGroupURL}/subattempt/${subattempt_id}/questions`, {
            answer_token: getAnswerToken()
        });
        return res;
    }

    /**
     * Untuk mendapatkan soal, pilihan jawaban dan jawaban yang telah dipilih
     */
    static async getAnswers() {
        const res = await service.get(`${this.baseGroupURL}/answer?answer_token=${getAnswerToken()}`);
        return res;
    }

    /**
     * Untuk menyimpan jawaban
     */
    static async putAnswer(answers) {
        const res = await service.put(`${this.baseGroupURL}/answer`, {
            answer_token: getAnswerToken(),
            answers: answers
        });
        return res;
    }

    /**
     * Finish
     */
    static async finishSubattempt(subattempt_id) {
        const res = await service.post(`${this.baseGroupURL}/subattempt/finish/${subattempt_id}`);
        return res;
    }
}