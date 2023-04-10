"use client";
import styles from "./styles.module.scss";
import { List } from "antd";
import { ICONS, IMAGES } from "@/configs";
import Image from "next/image";
import { Col, Row, Collapse } from "antd";
import {
  HOMEPAGE_ABOUT,
  HOMEPAGE_CLIENT,
  HOMEPAGE_CHOOSE,
} from "@/constants/Homepage";
import Button from "@/components/elements/Button";

const { Panel } = Collapse;

export default function HomePage() {
  const data = [
    {
      title: "Easy Set Up",
    },
    {
      title: "Friendly Customer Support",
    },
    {
      title: "Cancel Anytime",
    },
  ];

  const excellence = [
    {
      illust: <Image src={IMAGES.ILLUST_EXCELLENCE1} alt="kayaroll" />,
      title: "Save your Money",
      description:
        "Time-consuming payroll calculations and processes that take up critical resources.",
    },
    {
      illust: <Image src={IMAGES.ILLUST_EXCELLENCE2} alt="kayaroll" />,
      title: "Save your Time",
      description:
        "To any business, time is money. Digitalise to rid yourself of tedious paperwork, and improve efficiency.",
    },
    {
      illust: <Image src={IMAGES.ILLUST_EXCELLENCE3} alt="kayaroll" />,
      title: "Stay Compliant",
      description:
        "Our systems are well attuned to government reporting requirements.",
    },
  ];

  return (
    <main>
      <div className={styles.topBar}>
        <div>
          <text>ID | EN</text>
        </div>
        <div>
          <text>Contact Support</text>
        </div>
      </div>

      <div className={styles.header}>
        <div className="info">
          <p>Payroll & HR Solutions Specially Curated For SMEs And Start-Ups</p>
          <h1>The Smoother The Better.</h1>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Image src={ICONS.CHECKED} alt="checked" />}
                  title={item.title}
                />
              </List.Item>
            )}
          />
          <Button info={"Get a Demo, Try Us!"} />
        </div>
        <div>
          <Image src={IMAGES.KAYAROLL_SHOW} alt="kayaroll" />
        </div>
      </div>

      <div className={styles.company}>
        <h1>We’ve helped 100+ SMEs and Startups</h1>
        <Row gutter={[24, 16]} justify={"center"}>
          {HOMEPAGE_CLIENT.map((item, index) => (
            <Col span={4} key={index}>
              {item.images}
            </Col>
          ))}
        </Row>
      </div>

      <div className={styles.about}>
        <h1>About Kayaroll</h1>
        <p>
          A friend to SMEs and Start‑ups, we’re here to help you keep payroll
          processes simple, smooth and secure, so that you can focus on what’s
          important!
        </p>
        <Row gutter={[24, 16]} justify={"center"}>
          {HOMEPAGE_ABOUT.map((item, index) => (
            <Col span={8} key={index}>
              <div className={styles.containerAbout}>
                <div className={styles.aboutCircle}>{item.icon}</div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className={styles.excellence}>
        {excellence.map((item, index) => (
          <div className={styles.containerExcellence} key={index}>
            <div className={styles.excellence_info}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
            <div className={styles.excellence_illust}>{item.illust}</div>
          </div>
        ))}
      </div>

      <div className={styles.about}>
        <h1>Why Choose Kayaroll?</h1>
        <Row gutter={[24, 16]} justify={"center"}>
          {HOMEPAGE_CHOOSE.map((item, index) => (
            <Col span={8} key={index}>
              <div className={styles.containerAbout}>
                <div className={styles.aboutCircle}>{item.icon}</div>
                <h2>{item.title}</h2>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className={styles.faq}>
        <div className={styles.excellence_info}>
          <h1>Frequently asked questions</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            Blandit risus vitae viverra porta. Nam ullamcorper est ac fermentum
            condimentum.
          </p>
        </div>
        <div className={styles.faq_collapse}>
          <Collapse>
            <Panel header="What is Kayaroll?" key="1">
              <p>Test</p>
            </Panel>
          </Collapse>
        </div>
      </div>

      <div className={styles.signup}>
        <Image src={IMAGES.KAYAROLL_LOGOMARK} alt="kayaroll" />
        <h1>Sign-up with us and enjoy our services for FREE today!</h1>
        <p>
          Hurry! Register your company today, to be first in line for when our
          product hits the ground, and enjoy our solution completely FREE!
        </p>
        <Button info={"Try for free"} />
      </div>
    </main>
  );
}
