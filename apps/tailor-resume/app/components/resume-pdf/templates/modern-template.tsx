import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ResumeDataSchemaTypeExtended } from "@/components/resume-enhancer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottom: "2px solid #333",
    paddingBottom: 10,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    textAlign: "right",
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: "#666",
    marginBottom: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    padding: "4 8",
    marginBottom: 8,
  },
  experienceItem: {
    marginBottom: 12,
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
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  skills: {
    fontSize: 10,
    lineHeight: 1.5,
  },
});

interface ModernTemplateProps {
  data: ResumeDataSchemaTypeExtended;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.contact}>{data.personalInfo.email}</Text>
            <Text style={styles.contact}>{data.personalInfo.phone}</Text>
            <Text style={styles.contact}>{data.personalInfo.location}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skills}>{data.skills}</Text>
        </View>

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
