import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ResumeDataSchemaTypeExtended } from "../resume-data/resume-data";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottom: "1px solid #999",
    paddingBottom: 3,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  company: {
    fontSize: 11,
    color: "#666",
  },
  dates: {
    fontSize: 10,
    color: "#666",
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
    marginBottom: 5,
  },
  skills: {
    fontSize: 10,
    marginBottom: 3,
  },
  contact: {
    fontSize: 10,
    marginBottom: 2,
  },
});

interface ResumeDocumentProps {
  data: ResumeDataSchemaTypeExtended;
}

function ResumeDocument({ data }: ResumeDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contact}>{data.personalInfo.email}</Text>
          <Text style={styles.contact}>{data.personalInfo.phone}</Text>
          <Text style={styles.contact}>{data.personalInfo.location}</Text>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.title}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.dates}>
                {exp.startDate} - {exp.endDate || "Present"}
              </Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skills}>{data.skills}</Text>
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{edu.degree}</Text>
              <Text style={styles.company}>{edu.school}</Text>
              <Text style={styles.dates}>
                {edu.startDate} - {edu.endDate || "Present"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ResumeDocument;
