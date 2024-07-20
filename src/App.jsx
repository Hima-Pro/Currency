import {
  ActionIcon,
  Button,
  Card,
  CopyButton,
  Group,
  LoadingOverlay,
  MantineProvider,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFetch } from "@mantine/hooks";

import ThemeSwitcher from "./components/ThemeSwitcher";
import ComboX from "./components/ComboX";

import logo from "./assets/images/logo.svg";
import socials from "./assets/socials.json";
import css from "./assets/css/app.module.css";

function App() {
  const [source, setSource] = useState("EGP - Egypt Pound");
  const [target, setTarget] = useState("RUB - Russia Ruble");
  const [amount, setAmount] = useState(undefined);
  const [data, setData] = useState(undefined);

  const from = source.split(" - ")[0];
  const to = target.split(" - ")[0];
  const { loading, refetch, error } = useFetch(
    `https://currency-api-tdim.vercel.app/${from}/${to}?amount=` + (amount > 0 ? amount : 1),
    { autoInvoke: false }
  );

  useEffect(() => setData(undefined), [source, target]);

  const swipe = () => {
    let keep = source;
    setSource(target);
    setTarget(keep);
  };

  const copyBtn = (
    <CopyButton value={data ?? ""} timeout={2000}>
      {({ copied, copy }) => (
        <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
          {copied ? <Icon icon="tabler:check" /> : <Icon icon="tabler:clipboard-text" />}
        </ActionIcon>
      )}
    </CopyButton>
  );

  const exchange = () =>
    refetch().then((data) => {
      if (data?.message) {
        setData(data?.message);
      } else {
        setData(
          data.amount == data.result
            ? `1 ${from} = ${data.result} ${to}`
            : `${data.amount} ${to} ~ 1 ${from} = ${data.result} ${to}`
        );
      }
    });

  return (
    <>
      <MantineProvider defaultColorScheme="auto">
        <section className={css.layout}>
          <header className={css.header}>
            <ThemeSwitcher />
            <img width={150} src={logo} />
            <h1>Currency Converter</h1>
            <div className={css.comboBox}>
              <ComboX value={source} onChange={(e) => setSource(e)} />
              <ActionIcon onClick={swipe} size="lg" variant="subtle" color="#ffffff">
                <Icon width={25} icon="mi:switch" />
              </ActionIcon>
              <ComboX value={target} position="bottom-end" onChange={(e) => setTarget(e)} />
            </div>
          </header>
          <Card className={css.content} component={Stack} withBorder>
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
            <NumberInput
              label="Amount"
              min={1}
              clampBehavior="strict"
              value={amount}
              placeholder="0.00"
              onChange={setAmount}
            />
            <TextInput
              readOnly
              error={(data ?? "") === error?.message}
              label="Result"
              value={data ?? ""}
              placeholder="0.00"
              rightSection={copyBtn}
            />
            <Button onClick={exchange}>Exchange</Button>
          </Card>
          <footer className={css.footer}>
            <Group>
              {socials.map((item, index) => (
                <ActionIcon
                  component="a"
                  href={item.href}
                  key={index}
                  target="_blank"
                  variant="default"
                  size={40}
                  p={5}
                >
                  <Icon width={20} color="#0099ff" icon={item.icon} />
                </ActionIcon>
              ))}
            </Group>
          </footer>
        </section>
      </MantineProvider>
    </>
  );
}

export default App;
