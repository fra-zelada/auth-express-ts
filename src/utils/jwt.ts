import jsonwebtoken from "jsonwebtoken";

const SECRET = "secretxddddd";
export class Jwt {
    static sign(payload: object): Promise<string | null> {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(
                payload,
                SECRET,
                { expiresIn: "1h" },
                (err, token) => {
                    if (err) reject(err);
                    resolve(token!);
                }
            );
        });
    }

    static verify<T>(token: string): Promise<T> {
        return new Promise((resolve, reject) => {
            jsonwebtoken.verify(token, SECRET, (err, payload) => {
                if (err) reject(err);
                resolve(payload as T);
            });
        });
    }
}
