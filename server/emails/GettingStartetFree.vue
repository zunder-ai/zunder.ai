<script setup lang="ts">
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text, } from '@vue-email/components'

defineProps({
  title: String,
  name: String
})

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";
</script>

<template>
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Getting startet for free with Zunder</Preview>
    <Body :style="main">
      <Container :style="container">
        <Section :style="logoContainer">
          <Img :src="`${baseUrl}/logo.png`" width="140" height="26" alt="Zunder" />
        </Section>
        <Heading :style="h1">{{ title }}</Heading>
        <Text :style="heroText">Hey {{name}}! Thank you for trying Zunder. In the attachments there is the ZIP file with the project basics.</Text>
      </Container>
    </Body>
  </Html>
</template>

