import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  ImageBackground,
  Pressable,
} from "react-native";
import { useGlobalContext } from "../context";
import Wave from "../../assets/waveHome.png";
import { FontAwesome5 } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Recorder from "../Components/Recorder/Recorder";
import Expand from "../Components/Recorder/Expand";
import client from "../api/client";

const CounselingForm = ({ route, navigation }) => {
  const {
    user,
    setUser,
    setAlert,
    setAppointmentArr,
    appointmentArr,
    setData,
  } = useGlobalContext();
  const [isListExpanded, setIsListExpanded] = useState(false);
  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };
  console.log("CounselingForm context", user);
  // const { stuData } = route.params;
  const stuData = user;
  console.log("CounselingForm DATA ->", stuData);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date()); // Add this line to initialize the date state

  const [takenBefore, setTakenBefore] = useState(false);
  const [heradAboutUs, setHeradAboutUs] = useState([
    {
      name: "বন্ধু",
      checked: false,
    },
    {
      name: "পরিবার",
      checked: false,
    },
    {
      name: "ডাক্তার",
      checked: false,
    },
    {
      name: "অনলাইন",
      checked: false,
    },
  ]);
  const [problems, setProblems] = useState([
    {
      name: "মন খারাপ",
      checked: false,
    },
    {
      name: "ধুমপান/মাদক গ্রহণের অভ্যাস আছে",
      checked: false,
    },
    {
      name: "সম্পর্কের অবনতি",
      checked: false,
    },
    {
      name: "ঘুম খুব কম/খুব বেশি হয়",
      checked: false,
    },
    {
      name: "কাজে অনাগ্রহ",
      checked: false,
    },
    {
      name: "অস্থিরতা",
      checked: false,
    },
    {
      name: "কোন কাজে মনোযোগ দিতে না পারা",
      checked: false,
    },
    {
      name: "সিদ্ধান্তহীনতা",
      checked: false,
    },
    {
      name: "পরীক্ষা ভীতি",
      checked: false,
    },
    {
      name: "আত্মহত্যার চিন্তা",
      checked: false,
    },
    {
      name: "অতিরিক্ত রাগ",
      checked: false,
    },
    {
      name: "সামাজিক দক্ষতার অভাব",
      checked: false,
    },
    {
      name: "তীব্র মানসিক আঘাত",
      checked: false,
    },
    {
      name: "অতিরিক্ত/খুব কম খাবার খাই",
      checked: false,
    },
    {
      name: "মানসিক চাপ",
      checked: false,
    },
    {
      name: "দুশ্চিন্তা",
      checked: false,
    },
    {
      name: "অন্যান্য",
      checked: false,
    },
  ]);

  const [otherProblem, setOtherProblem] = useState("");

  const [counselingType, setCounselingType] = useState([
    {
      type: "ব্যক্তিগত কাউন্সেলিং",
      checked: false,
    },
    {
      type: "গ্রুপ কাউন্সেলিং",
      checked: false,
    },
    {
      type: "মানসিক অবস্থা যাচাই",
      checked: false,
    },
  ]);

  const [counselingTime, setCounselingTime] = useState([
    {
      time: "সকাল ৯.০০টা",
      checked: false,
    },
    {
      time: "সকাল ১০.০০টা",
      checked: false,
    },
    {
      time: "সকাল ১১.০০টা",
      checked: false,
    },
    {
      time: "দুপুর ১২.০০টা",
      checked: false,
    },
    {
      time: "দুপুর ১.০০টা",
      checked: false,
    },
    {
      time: "দুপুর ২.০০টা",
      checked: false,
    },
  ]);

  const [counselingDay, setCounselingDay] = useState([
    {
      day: "রবিবার",
      checked: false,
    },
    {
      day: "সোমবার",
      checked: false,
    },
    {
      day: "মঙ্গলবার",
      checked: false,
    },
    {
      day: "বুধবার",
      checked: false,
    },
    {
      day: "বৃহস্পতিবার",
      checked: false,
    },
  ]);

  const handleProblemChange = (index) => {
    const newProblems = [...problems];
    newProblems[index].checked = !newProblems[index].checked;

    // Reset the custom problem text when deselecting "Others"
    if (index !== problems.length - 1) {
      setOtherProblem("");
    }

    setProblems(newProblems);
  };

  const handleOtherProblemChange = (text) => {
    setOtherProblem(text);
  };

  const handleHeradAboutUsChange = (index) => {
    const newHeradAboutUs = [...heradAboutUs];
    newHeradAboutUs[index].checked = !newHeradAboutUs[index].checked;
    setHeradAboutUs(newHeradAboutUs);
  };

  const handleCounselingTypeChange = (index) => {
    const newCounselingType = [...counselingType];
    newCounselingType[index].checked = !newCounselingType[index].checked;
    setCounselingType(newCounselingType);
  };

  const handleCounselingTimeChange = (index) => {
    const newCounselingTime = [...counselingTime];
    newCounselingTime[index].checked = !newCounselingTime[index].checked;
    setCounselingTime(newCounselingTime);
  };

  const handleCounselingDayChange = (index) => {
    const newCounselingDay = [...counselingDay];
    newCounselingDay[index].checked = !newCounselingDay[index].checked;
    setCounselingDay(newCounselingDay);
  };

  const handleSubmit = async () => {
    const formData = {
      name,
      department,
      mobile,
      age,
      email,
      address,
      date,
      takenBefore,
      heradAboutUs: heradAboutUs
        .filter((source) => source.checked)
        .map((source) => source.name),
      problems: problems
        .filter((problem) => problem.checked)
        .map((problem) =>
          problem.name === "অন্যান্য" ? otherProblem : problem.name
        ),
      counselingType: counselingType
        .filter((type) => type.checked)
        .map((type) => type.type),
      counselingTime: counselingTime
        .filter((time) => time.checked)
        .map((time) => time.time),
      counselingDay: counselingDay
        .filter((day) => day.checked)
        .map((day) => day.day),
    };
    console.log("This is formData from form", JSON.stringify(formData));

    //submit to server
    await client
      .post(`/appointment/${user.user._id}`, formData)
      .then((res) => {
        setAlert({
          on: true,
          type: "success",
          message: "আপনার ফর্মটি সাবমিট হয়েছে",
        });
        console.log(res.data);

        setAppointmentArr([...appointmentArr, res.data]);
        console.log("Appointment data", appointmentArr.length);
        setData(appointmentArr.length);

        navigation.navigate("Appointment");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ...

  const calculateAge = (dob) => {
    const dobArray = dob.split("-");
    const dobDate = new Date(dobArray[2], dobArray[1] - 1, dobArray[0]);
    const diffMs = Date.now() - dobDate.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  const fetchUser = async () => {
    setName(stuData.user?.name);
    setDepartment(stuData.user?.dept);
    setMobile(stuData.user?.phone);
    // setAge(stuData.user?.dob);

    // have to change this in the database
    // const dob = "27-03-2001"; // replace this with the actual date of birth
    const age = calculateAge(stuData.user?.dob);
    setAge(age.toString());

    // this ends here

    setEmail(stuData.user?.email);
    setAddress(stuData.user?.presentAddress);
    setDate(new Date()); // Set the date to the current date
  };

  const getDynamicStyle = (text) => {
    let marginRight = 300; // default margin
    if (text.length <= 4) {
      marginRight = 305;
    } else if (text.length > 10) {
      marginRight = 240; // increase margin for longer text
    }

    return {
      marginTop: 5,
      fontSize: 13,
      marginBottom: -7,
      fontFamily: "HindiSiliBold",
      marginLeft: 10,

      borderColor: "#000",
      borderWidth: 1,
      marginRight: marginRight,
      borderRadius: 10,
      backgroundColor: "#ececec",
      zIndex: 55,
      textAlign: "center",
      textAlignVertical: "center",
    };
  };

  function formatDate(date) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={Wave} style={styles.image}>
        <View style={styles.header}>
          <FontAwesome5
            name="arrow-left"
            size={24}
            color="black"
            style={{ paddingLeft: 20 }}
            onPress={() => navigation.goBack()}
          />
          <Recorder toggleList={toggleList} />
        </View>

        <Text
          style={{
            textAlign: "center",
            fontSize: 28,
            padding: 10,
            marginBottom: 30,
            marginHorizontal: 20,
            borderColor: "#000",
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: "white",
            fontFamily: "HindiSiliBold",
            marginTop: -40,
          }}
        >
          কাউন্সেলিং সেন্টার{"\n"} রেজিস্ট্রেশন ফর্ম
        </Text>
      </ImageBackground>

      {isListExpanded && <Expand />}

      <View style={styles.formContainer}>
        <View>
          <Text style={getDynamicStyle("নাম")}>নাম</Text>
          <Text style={styles.input}>{name}</Text>

          <Text style={getDynamicStyle("মোবাইল")}>মোবাইল</Text>
          <Text style={styles.input}>{mobile}</Text>

          <Text style={getDynamicStyle("বয়স")}>বয়স</Text>
          <Text style={styles.input}>{age}</Text>

          <Text style={getDynamicStyle("বিভাগ")}>বিভাগ</Text>
          <Text style={styles.input}>{department}</Text>

          <Text style={getDynamicStyle("Email")}>ই-মেইল</Text>
          <Text style={styles.input}>{email}</Text>

          <Text style={getDynamicStyle("বর্তমান ঠিকানা")}>বর্তমান ঠিকানা</Text>
          <Text style={styles.input}>{address}</Text>

          <Text style={getDynamicStyle("তারিখ")}>তারিখ</Text>
          <Text style={styles.input}>{formatDate(date)}</Text>
        </View>

        <Text style={styles.subtitle}>
          আপনার ক্ষেত্রে প্রযোজ্য বিষয়গুলোর পাশে টিক দিনঃ
        </Text>
        {problems.map((problem, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={problem.checked}
              onValueChange={() => handleProblemChange(index)}
              title={problem.name}
            />
            <Text style={styles.checkboxText} editable={false}>
              {problem.name}
            </Text>
            {problem.name === "অন্যান্য" && problem.checked && (
              <TextInput
                style={[styles.input, styles.otherProblemInput]}
                placeholder="Describe other problem"
                value={otherProblem}
                onChangeText={handleOtherProblemChange}
              />
            )}
          </View>
        ))}

        <Text style={styles.subtitle}>
          কোন ধরনের কাউন্সেলিং সেবা নিতে চাচ্ছেন?
        </Text>
        {counselingType.map((type, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={type.checked}
              onValueChange={() => handleCounselingTypeChange(index)}
            />
            <Text style={styles.checkboxText}>{type.type}</Text>
          </View>
        ))}

        <Text style={styles.subtitle}>
          কখন কাউন্সেলিং সেবা নিতে চাচ্ছেন? (সুবিধাজনক সময়):
        </Text>
        {counselingTime.map((time, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={time.checked}
              onValueChange={() => handleCounselingTimeChange(index)}
            />
            <Text style={styles.checkboxText}>{time.time}</Text>
          </View>
        ))}

        <Text style={styles.subtitle}>
          কখন কাউন্সেলিং সেবা নিতে চাচ্ছেন? (সুবিধাজনক দিন):
        </Text>
        {counselingDay.map((day, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={day.checked}
              onValueChange={() => handleCounselingDayChange(index)}
            />
            <Text style={styles.checkboxText}>{day.day}</Text>
          </View>
        ))}

        <Text style={styles.subtitle}>আগে কখনো কাউন্সেলিং সেবা নিয়েছেন ?</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={takenBefore}
            onValueChange={() => setTakenBefore(!takenBefore)}
          />
          <Text style={styles.checkboxText}>হ্যাঁ</Text>
        </View>

        <Text style={styles.subtitle}>কাউন্সেলিং সম্পর্কে কোথায় জেনেছেন?</Text>
        {heradAboutUs.map((source, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={source.checked}
              onValueChange={() => handleHeradAboutUsChange(index)}
            />
            <Text style={styles.checkboxText}>{source.name}</Text>
          </View>
        ))}
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>সাবমিট</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subText: {
    fontSize: 13,
    marginBottom: -7,
    fontFamily: "HindiSili",
    marginLeft: 10,
    paddingHorizontal: 10,
    borderColor: "#000",
    borderWidth: 1,
    marginRight: 300,
    borderRadius: 10,
    backgroundColor: "white",
    zIndex: 55,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "HindiSili",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
  },
  formContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "HindiSiliBold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "HindiSiliBold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 18, // Optional: Adjust the font size as needed
    fontFamily: "HindiSili", // Optional: Adjust the text color
  },
  otherProblemInput: {
    height: 100, // Adjust the height as needed
    textAlignVertical: "top", // Android only
    width: "70%",
  },
});

export default CounselingForm;
