import { Text, View, ScrollView, Alert } from "react-native";

import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart } from "../shared/utils/generate-range-between-dates";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../components/loading";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isOddNumber from "../shared/utils/isOddNumber";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesSinceStartOfMonth = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = isOddNumber(dayjs().month() + 1) ? 31 : 30;
const amountOfDaysToFill =
  minimumSummaryDatesSizes - datesSinceStartOfMonth.length;

type SummaryProps = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function HomeScreen() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null);

  async function fetchData() {
    try {
      setLoading(true);

      const user = await AsyncStorage.getItem("@user");

      const userId = JSON.parse(user ?? "").id;

      const response = await api.get(`/${userId}/summary`);
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "O sumário de hábitos não carregou irmão!! :/");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((day, i) => (
          <Text
            key={`${day}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center m-1"
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary && (
          <View className="flex-row flex-wrap">
            {datesSinceStartOfMonth.map((date, i) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(dayjs(day.date), "day");
              });

              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountOfCompleted={dayWithHabits?.completed}
                  onPress={() =>
                    navigate("habit", { date: date.toISOString() })
                  }
                />
              );
            })}

            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                <View
                  key={i}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
