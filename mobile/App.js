import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Linking, ScrollView } from 'react-native';
import * as LinkingExpo from 'expo-linking';
import { wallet as walletCore } from '@thresho/core';

const API = 'http://localhost:4000';

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('alice');
  const [password, setPassword] = useState('password');

  async function login() {
    const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
    const data = await res.json();
    setToken(data.token);
  }

  return (
    <SafeAreaView style={{ flex:1 }}>
      {!token ? (
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: '600' }}>Thresho (Mobile)</Text>
          <Text>Login</Text>
          <TextInput placeholder="username" value={username} onChangeText={setUsername} style={{ borderWidth:1, marginVertical:6, padding:8 }} />
          <TextInput placeholder="password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth:1, marginVertical:6, padding:8 }} />
          <Button title="Login" onPress={login} />
        </View>
      ) : (
        <WalletScreen token={token} />
      )}
    </SafeAreaView>
  );
}

function WalletScreen({ token }) {
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [amount, setAmount] = useState('1');
  const [pending, setPending] = useState([]);

  async function propose() {
    const res = await fetch(`${API}/tx/propose`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ sourcePublicKey: source, destinationPublicKey: dest, amount, asset:'XLM', level: 'med' }) });
    const data = await res.json();
    await load();
  }

  async function load() {
    const res = await fetch(`${API}/tx/pending`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setPending(data);
  }

  useEffect(() => { load(); }, []);

  function openSep7(xdr) {
    const url = walletCore.buildSep7UrlForTx(xdr, 'test');
    Linking.openURL(url);
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Create Transaction (SEP-7 signing)</Text>
      <TextInput placeholder="Source G..." value={source} onChangeText={setSource} style={{ borderWidth:1, marginVertical:6, padding:8 }} />
      <TextInput placeholder="Destination G..." value={dest} onChangeText={setDest} style={{ borderWidth:1, marginVertical:6, padding:8 }} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} style={{ borderWidth:1, marginVertical:6, padding:8 }} />
      <Button title="Propose" onPress={propose} />

      <Text style={{ marginTop: 16, fontSize: 18 }}>Pending</Text>
      {pending.map(p => (
        <View key={p.id} style={{ borderWidth:1, marginVertical:6, padding:8 }}>
          <Text>{p.amount} XLM → {p.destinationPublicKey}</Text>
          <Button title="Open in wallet (SEP-7)" onPress={() => openSep7(p.xdr)} />
        </View>
      ))}
    </ScrollView>
  );
}
