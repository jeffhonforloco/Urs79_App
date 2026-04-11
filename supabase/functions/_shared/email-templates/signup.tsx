/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>URS79</Text>
        <Hr style={divider} />
        <Heading style={h1}>Welcome aboard!</Heading>
        <Text style={text}>
          Thanks for signing up for{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          . Confirm your email address ({recipient}) to get started.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Verify Email
        </Button>
        <Hr style={divider} />
        <Text style={footer}>
          If you didn't create an account, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Instrument Sans', Arial, sans-serif" }
const container = { padding: '40px 24px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '800' as const, color: '#d4a017', letterSpacing: '2px', margin: '0 0 24px' }
const divider = { borderColor: '#e5e5e5', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#111111', margin: '0 0 16px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#333333', lineHeight: '1.6', margin: '0 0 20px' }
const link = { color: '#d4a017', textDecoration: 'underline' }
const button = { backgroundColor: '#d4a017', color: '#050505', fontSize: '14px', fontWeight: '700' as const, borderRadius: '4px', padding: '12px 24px', textDecoration: 'none' }
const footer = { fontSize: '12px', color: '#999999', margin: '0' }
