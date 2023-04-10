"use client";
import styles from "./styles.module.scss";
import { ICONS, IMAGES } from "@/configs";
import Image from "next/image";
import TextInput from "@/components/elements/TextInput";

export default function RegisterPage() {
  return (
    <main className={styles.container}>
      <div className={styles.form}>
        <Image src={IMAGES.KAYAROLL_LOGO} alt={"kayaroll"} />
        <h1>Register</h1>
        <p>Payroll solutions specially curated for SMEs and start-ups</p>
        <TextInput
          placeholder={"Input email adress"}
          label={"Email"}
          type={"text"}
          important
        />
        <TextInput
          placeholder={"Input password"}
          label={"Password"}
          type={"password"}
        />
      </div>
    </main>
  );
}
