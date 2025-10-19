import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [permission, setPermission] = useState(null);
  const devices = useCameraDevices();
  const device = devices.front ?? devices.back;
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setPermission(status === 'authorized');
    })();
  }, []);

  if (permission === null) return <Center>Meminta izin kamera…</Center>;
  if (!permission) return <Center>Izinkan kamera di Settings.</Center>;
  if (!device) return <Center>Memuat kamera…</Center>;

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={StyleSheet.absoluteFill} device={device} isActive={true} />
      <TouchableOpacity style={styles.fab}><Text style={styles.fabText}>Kamera OK</Text></TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
}

function Center({ children }) {
  return <View style={styles.center}><Text>{children}</Text></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  fab: { position: 'absolute', right: 20, bottom: 40, backgroundColor: '#0A84FF',
         paddingHorizontal: 18, paddingVertical: 12, borderRadius: 24, elevation: 3 },
  fabText: { color: '#fff', fontWeight: '700' }
});