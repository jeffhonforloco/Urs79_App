import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "URS79"

interface SubmissionReceivedProps {
  artistName?: string
  releaseTitle?: string
  submissionId?: string
}

const SubmissionReceivedEmail = ({ artistName, releaseTitle, submissionId }: SubmissionReceivedProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your music submission has been received — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME}</Text>
        <Hr style={divider} />
        <Heading style={h1}>
          {artistName ? `${artistName}, your submission is in!` : 'Your submission is in!'}
        </Heading>
        {releaseTitle && (
          <Text style={highlight}>
            🎵 {releaseTitle}
          </Text>
        )}
        {submissionId && (
          <Text style={idText}>
            Submission ID: <strong>{submissionId}</strong>
          </Text>
        )}
        <Text style={text}>
          Our A&R team will review your submission and reach out within 5–7 business days. We'll notify you when there's an update.
        </Text>
        <Text style={text}>
          Track your submission status anytime at{' '}
          <Link href="https://urs79.com/submit" style={link}>urs79.com/submit</Link>.
        </Text>
        <Hr style={divider} />
        <Text style={footer}>
          © {SITE_NAME} · Music · Creative · Distribution
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: SubmissionReceivedEmail,
  subject: (data: Record<string, any>) =>
    data.releaseTitle
      ? `Submission received: ${data.releaseTitle} — URS79`
      : 'Your music submission has been received — URS79',
  displayName: 'Music submission confirmation',
  previewData: { artistName: 'Nova Sound', releaseTitle: 'Midnight Drive', submissionId: 'URS-4827' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Instrument Sans', Arial, sans-serif" }
const container = { padding: '40px 24px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '800' as const, color: '#d4a017', letterSpacing: '2px', margin: '0 0 24px' }
const divider = { borderColor: '#e5e5e5', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#111111', margin: '0 0 16px', lineHeight: '1.3' }
const highlight = { fontSize: '16px', color: '#d4a017', fontWeight: '600' as const, margin: '0 0 12px' }
const idText = { fontSize: '13px', color: '#666666', margin: '0 0 20px', fontFamily: 'monospace' }
const text = { fontSize: '15px', color: '#333333', lineHeight: '1.6', margin: '0 0 16px' }
const link = { color: '#d4a017', textDecoration: 'underline' }
const footer = { fontSize: '12px', color: '#999999', margin: '0', textAlign: 'center' as const }
