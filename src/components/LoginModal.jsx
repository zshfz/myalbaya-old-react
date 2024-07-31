import style from "../styles/LoginModal.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../context/Context";

const LoginModal = (props) => {
  const { login } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const initialValues = {
    email: "",
    password1: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("유효한 이메일을 입력해주세요.")
      .required("값을 입력해주세요."),
    password1: Yup.string()
      .min(5, "비밀번호는 최소 5자 이상 입력하세요.")
      .matches(passwordRules, {
        message:
          "최소 5자, 1개 이상의 대문자, 소문자, 숫자를 포함해서 입력해주세요.",
      })
      .required("값을 입력해주세요."),
  });

  const handleLogin = async (data) => {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>
        <div className={style.container}>
          <div className={style.header}>
            <h2>내 알바야?!</h2>
            <h6>
              <span>아르바이트생</span>
              들을 위한 익명 커뮤니티 사이트
            </h6>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
          >
            <Form className={style.body}>
              <Field
                className={style.input}
                name="email"
                placeholder="이메일"
              />
              <ErrorMessage name="email" component="p" />
              <Field
                className={style.input}
                name="password1"
                type="password"
                placeholder="비밀번호"
              />
              <ErrorMessage name="password1" component="p" />
              <button type="submit">로그인</button>
              <span
                onClick={() => {
                  navigate("/register");
                }}
              >
                회원가입
              </span>
              {error && <p>{error}</p>}
            </Form>
          </Formik>
        </div>
        <div className={style.closeButton}>
          <Button variant="secondary" onClick={props.handleClose}>
            닫기
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
