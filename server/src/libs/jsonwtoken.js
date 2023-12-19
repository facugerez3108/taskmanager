
import jwt from 'jsonwebtoken';

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        "xyz123",
        {
          expiresIn: "3d",
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
};

export const createRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {id: userId},
        "xyz123",
        {
          expiresIn: "7d",
        },
        (err, token) => {
          if (err) {
          console.log("Error generando el token:", err);
          reject(err);
        }else{
          resolve(token);
          console.log("Token generado:", token);
        }

        }
      );
    });
}

export const createResetPasswordToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: userId },
      "xyz123",
      {
        expiresIn: "10m",
      },
      (err, token) => {
        if (err) {
          console.error("Error generando el token:", err);
          reject(err);
        } else {
          console.log("Token generado:", token);
          resolve(token);
        }
      }
    );
  });
};