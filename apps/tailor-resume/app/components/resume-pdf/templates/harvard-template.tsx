import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ResumeDataSchemaTypeExtended } from "@/components/resume-enhancer";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: "#ffffff",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    marginBottom: 4,
    textTransform: "uppercase",
    fontFamily: "Times-Roman",
  },
  contactInfo: {
    fontSize: 11,
    textAlign: "center",
    color: "#000",
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    textTransform: "uppercase",
    borderBottom: "1px solid #000",
    paddingBottom: 2,
    marginBottom: 8,
    fontFamily: "Times-Bold",
  },
  educationItem: {
    marginBottom: 8,
  },
  schoolName: {
    fontSize: 11,
    fontFamily: "Times-Bold",
  },
  schoolLocation: {
    fontSize: 11,
    textAlign: "right",
  },
  degreeInfo: {
    fontSize: 11,
    fontStyle: "italic",
  },
  graduationDate: {
    fontSize: 11,
    textAlign: "right",
    fontStyle: "italic",
  },
  experienceItem: {
    marginBottom: 10,
  },
  organizationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  organization: {
    fontSize: 11,
    fontFamily: "Times-Bold",
  },
  location: {
    fontSize: 11,
  },
  positionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  position: {
    fontSize: 11,
    fontStyle: "italic",
  },
  dates: {
    fontSize: 11,
    fontStyle: "italic",
  },
  bulletPoint: {
    fontSize: 11,
    marginBottom: 2,
    paddingLeft: 12,
  },
  bullet: {
    position: "absolute",
    left: 0,
  },
  skillsText: {
    fontSize: 11,
  },
});

interface HarvardTemplateProps {
  data: ResumeDataSchemaTypeExtended;
}

export function HarvardTemplate({ data }: HarvardTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contactInfo}>
            {data.personalInfo.location} | {data.personalInfo.email} |{" "}
            {data.personalInfo.phone}
          </Text>
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.schoolName}>{edu.school}</Text>
                <Text style={styles.schoolLocation}>{edu.location}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.degreeInfo}>{edu.degree}</Text>
                <Text style={styles.graduationDate}>
                  {edu.startDate} - {edu.endDate || "Present"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.organizationHeader}>
                <Text style={styles.organization}>{exp.company}</Text>
                <Text style={styles.location}>{exp.location}</Text>
              </View>
              <View style={styles.positionHeader}>
                <Text style={styles.position}>{exp.title}</Text>
                <Text style={styles.dates}>
                  {exp.startDate} - {exp.endDate || "Present"}
                </Text>
              </View>
              {exp.description.split("\n").map((bullet, bulletIndex) => (
                <View key={bulletIndex} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{bullet.trim()}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Skills Section */}
        {data.skills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Interests</Text>
            <Text style={styles.skillsText}>{data.skills}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
