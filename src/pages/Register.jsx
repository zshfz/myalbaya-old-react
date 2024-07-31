import style from "../styles/Register.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 프로필 from "../images/프로필.png";

const Register = () => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState("");
  const [error, setError] = useState("");

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const initialValues = {
    name: "",
    nickname: "",
    email: "",
    password1: "",
    password2: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "이름은 최소 2자 이상 입력하세요.")
      .max(8, "이름은 최대 8자까지 입력할 수 있습니다.")
      .required("값을 입력하세요."),
    nickname: Yup.string()
      .min(3, "닉네임은 최소 3자 이상 입력하세요.")
      .max(8, "닉네임은 최대 8자까지 입력할 수 있습니다.")
      .required("값을 입력하세요."),
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
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "비밀번호가 일치하지 않습니다.")
      .required("값을 입력하세요."),
  });

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const handleRegisterBoss = async (data) => {
    try {
      await axios.post("http://localhost:8080/members/new/boss", data);
      alert("회원가입이 완료되었습니다. 홈 화면으로 이동합니다.");
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleRegisterEmployee = async (data) => {
    try {
      await axios.post("http://localhost:8080/members/new/employee", data);
      alert("회원가입이 완료되었습니다. 홈 화면으로 이동합니다.");
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <Tabs defaultActiveKey="link0" fill>
      <Tab eventKey="link0" title={<span>아르바이트생</span>}>
        <div className={style.container}>
          <div
            className={style.header}
            onClick={() => {
              navigate("/");
            }}
          >
            <h2>내 알바야?!</h2>
            <h6>
              <span className={style.employee}>아르바이트생</span>들을 위한 익명
              커뮤니티 사이트
            </h6>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleRegisterEmployee}
            validationSchema={validationSchema}
          >
            <Form className={style.body}>
              <Field className={style.input} name="name" placeholder="이름" />
              <ErrorMessage name="name" component="p" />
              <Field
                className={style.input}
                name="nickname"
                placeholder="닉네임"
              />
              <ErrorMessage name="nickname" component="p" />
              <Field
                className={style.input}
                name="email"
                placeholder="이메일"
              />
              <ErrorMessage name="email" component="p" />
              <Field
                className={style.input}
                type="password"
                name="password1"
                placeholder="비밀번호"
              />
              <ErrorMessage name="password1" component="p" />
              <Field
                className={style.input}
                type="password"
                name="password2"
                placeholder="비밀번호 재입력"
              />
              <ErrorMessage name="password2" component="p" />
              <div className={style.profileImage}>
                <label>프로필 이미지 선택</label>
                {uploadedImage ? (
                  <img src={uploadedImage} alt="" />
                ) : (
                  <img src={프로필} alt="" />
                )}
                <input type="file" onChange={handleChangeImage} />
              </div>
              <button className={style.employee} type="submit">
                회원가입
              </button>
              구혀
            </Form>
          </Formik>
        </div>
      </Tab>
      <Tab eventKey="link1" title={<span>자영업자</span>}>
        <div className={style.container}>
          <div
            className={style.header}
            onClick={() => {
              navigate("/");
            }}
          >
            <h2>내 알바야?!</h2>
            <h6>
              <span className={style.boss}>자영업자</span>들을 위한 익명
              커뮤니티 사이트
            </h6>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleRegisterBoss}
            validationSchema={validationSchema}
          >
            <Form className={style.body}>
              <Field className={style.input} name="name" placeholder="이름" />
              <ErrorMessage name="name" component="p" />
              <Field
                className={style.input}
                name="nickname"
                placeholder="닉네임"
              />
              <ErrorMessage name="nickname" component="p" />
              <Field
                className={style.input}
                name="email"
                placeholder="이메일"
              />
              <ErrorMessage name="email" component="p" />
              <Field
                className={style.input}
                type="password"
                name="password1"
                placeholder="비밀번호"
              />
              <ErrorMessage name="password1" component="p" />
              <Field
                className={style.input}
                type="password"
                name="password2"
                placeholder="비밀번호 재입력"
              />
              <ErrorMessage name="password2" component="p" />
              <div className={style.profileImage}>
                <label>프로필 이미지 선택</label>
                {uploadedImage ? (
                  <img src={uploadedImage} alt="" />
                ) : (
                  <img src={프로필} alt="" />
                )}
                <input type="file" onChange={handleChangeImage} />
              </div>
              <button className={style.boss} type="submit">
                회원가입
              </button>
              {error && <p>{error}</p>}
            </Form>
          </Formik>
        </div>
      </Tab>
    </Tabs>
  );
};

export default Register;
