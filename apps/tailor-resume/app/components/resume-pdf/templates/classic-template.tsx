import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ResumeDataSchemaTypeExtended } from "@/components/resume-enhancer";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
  },
  name: {
    fontSize: 28,
    marginBottom: 8,
    fontFamily: "Helvetica-Bold",
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    fontSize: 10,
    color: "#333",
    marginBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    borderBottom: "1px solid #999",
    paddingBottom: 4,
    marginBottom: 8,
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  company: {
    fontSize: 11,
  },
  dates: {
    fontSize: 10,
    color: "#666",
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    marginTop: 4,
  },
  skills: {
    fontSize: 10,
    lineHeight: 1.5,
  },
});

interface ClassicTemplateProps {
  data: ResumeDataSchemaTypeExtended;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.email}</Text>
            {data.personalInfo.phone && <Text>•</Text>}
            {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text>•</Text>}
            {data.personalInfo.location && (
              <Text>{data.personalInfo.location}</Text>
            )}
          </View>
        </View>

        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.experienceItem} wrap={false}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{edu.degree}</Text>
                    <Text style={styles.company}>{edu.school}</Text>
                  </View>
                  <Text style={styles.dates}>
                    {edu.startDate} - {edu.endDate || "Present"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader} wrap={false}>
                  <View>
                    <Text style={styles.jobTitle}>{exp.title}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                  <Text style={styles.dates}>
                    {exp.startDate} - {exp.endDate || "Present"}
                  </Text>
                </View>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.skills && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skills}>{data.skills}</Text>
          </View>
        )}

        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader} wrap={false}>
                  <View>
                    <Text style={styles.jobTitle}>{project.name}</Text>
                  </View>
                </View>
                <Text style={styles.description}>{project.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.awards?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards & Honors</Text>
            {data.awards.map((award, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader} wrap={false}>
                  <View>
                    <Text style={styles.jobTitle}>{award.title}</Text>
                  </View>
                </View>
                <Text style={styles.description}>{award.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.volunteer?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Work</Text>
            {data.volunteer.map((vol, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader} wrap={false}>
                  <View>
                    <Text style={styles.jobTitle}>{vol.role}</Text>
                    <Text style={styles.company}>{vol.organization}</Text>
                  </View>
                  <Text style={styles.dates}>
                    {vol.startDate} - {vol.endDate || "Present"}
                  </Text>
                </View>
                {vol.description && (
                  <Text style={styles.description}>{vol.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
