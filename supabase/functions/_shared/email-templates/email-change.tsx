/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface EmailChangeEmailProps {
  siteName: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  email,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email change for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>URS79</Text>
        <Hr style={divider} />
        <Heading style={h1}>Confirm your email change</Heading>
        <Text style={text}>
          You requested to change your email from{' '}
          <Link href={`mailto:${email}`} style={link}>{email}</Link>{' '}
          to{' '}
          <Link href={`mailto:${newEmail}`} style={link}>{newEmail}</Link>.
        </Text>
        <Text style={text}>
          <Link href={confirmationUrl} style={link}>Click here to confirm this change</Link>
        </Text>
        <Hr style={divider} />
        <Text style={footer}>
          If you didn't request this change, please secure your account immediately.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Instrument Sans', Arial, sans-serif" }
const container = { padding: '40px 24px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '800' as const, color: '#d4a017', letterSpacing: '2px', margin: '0 0 24px' }
const divider = { borderColor: '#e5e5e5', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#111111', margin: '0 0 16px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#333333', lineHeight: '1.6', margin: '0 0 20px' }
const link = { color: '#d4a017', textDecoration: 'underline' }
const footer = { fontSize: '12px', color: '#999999', margin: '0' }
