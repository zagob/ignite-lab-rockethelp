import { Heading, VStack, Text, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import auth from "@react-native-firebase/auth";

import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Alert } from "react-native";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

  function handleSignIn() {
    console.log("sd");
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail e senha.");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err.code);
        setIsLoading(false);

        if (err.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail inválido.");
        }

        if ((err.code = "auth/wrong-password")) {
          return Alert.alert("Entrar", "E-mail ou senha inválida");
        }

        if (err.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "E-mail ou senha inválida");
        }

        return Alert.alert("Entrar", "Não foi possivel acessar");
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      {/* <Logo /> */}
      <Text color="gray.100" fontSize="xl">
        RocketHelp
      </Text>
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="Email"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
