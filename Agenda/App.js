import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const dbRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [contacts, setContacts] = useState([]);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (Platform.OS === 'web') {
        console.warn('expo-sqlite on web is experimental — see docs for extra setup.');
      }
      try {
        const db = await SQLite.openDatabaseAsync('contacts.db');
        dbRef.current = db;

        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT,
            surname TEXT,
            phone TEXT,
            email TEXT
          );
        `);

        if (!mounted) return;
        setReady(true);
        await loadContacts();
      } catch (err) {
        console.error('Erro inicializando DB:', err);
        Alert.alert('Erro DB', String(err));
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const loadContacts = async () => {
    if (!dbRef.current) return;
    try {
      const rows = await dbRef.current.getAllAsync('SELECT * FROM contacts;');
      setContacts(rows);
    } catch (err) {
      console.error('Erro ao carregar contatos:', err);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !surname.trim() || !phone.trim() || !email.trim()) {
      Alert.alert('Validação', 'Preencha todos os campos');
      return;
    }
    if (!dbRef.current) {
      Alert.alert('DB não pronto', 'Aguarde a inicialização do banco');
      return;
    }

    try {
      if (editingId) {
        await dbRef.current.runAsync(
          'UPDATE contacts SET name = ?, surname = ?, phone = ?, email = ? WHERE id = ?;',
          [name, surname, phone, email, editingId]
        );
      } else {
        const res = await dbRef.current.runAsync(
          'INSERT INTO contacts (name, surname, phone, email) VALUES (?, ?, ?, ?);',
          [name, surname, phone, email]
        );
        console.log('Inserido id:', res.lastInsertRowId);
      }

      await loadContacts();

      setName('');
      setSurname('');
      setPhone('');
      setEmail('');
      setEditingId(null);
    } catch (err) {
      console.error('Erro ao salvar contato:', err);
      Alert.alert('Erro', String(err));
    }
  };

  const handleEdit = (item) => {
    setName(item.name || '');
    setSurname(item.surname || '');
    setPhone(item.phone || '');
    setEmail(item.email || '');
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!dbRef.current) return;
    try {
      await dbRef.current.runAsync('DELETE FROM contacts WHERE id = ?;', [id]);
      await loadContacts();
    } catch (err) {
      console.error('Erro ao excluir:', err);
      Alert.alert('Erro ao excluir', String(err));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda de Contatos</Text>

      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Sobrenome" value={surname} onChangeText={setSurname} />
      <TextInput style={styles.input} placeholder="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{editingId ? 'Salvar' : 'Adicionar'}</Text>
      </TouchableOpacity>

      <FlatList
        data={contacts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>
              {item.name} {item.surname} - {item.phone} - {item.email}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.edit}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80 , padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#fff' },
  button: { backgroundColor: '#007bff', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  contactItem: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  contactText: { fontSize: 16, flex: 1, marginRight: 10 },
  edit: { color: 'green', marginRight: 12, fontWeight: 'bold' },
  delete: { color: 'red', fontWeight: 'bold' },
});
