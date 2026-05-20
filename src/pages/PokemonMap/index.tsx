import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity,
         ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Region, MapPressEvent }
  from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { getPokemonSightings, insertPokemonSightings } from '../../services/pokemonSightings';
 
type Coordinates = { latitude: number; longitude: number };
 
const DEFAULT_REGION: Region = {
  latitude: -22.35,
  longitude: -45.71,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function PokemonMapScreen() {
  const theme  = useTheme();
  const styles = createStyles(theme);
  const route  = useRoute<RouteProp<RootStackParamList, 'PokemonMap'>>();
  const { id, name } = route.params;
 
  const [permission, requestPermission] =
    Location.useForegroundPermissions();
  const [marker, setMarker]   = useState<Coordinates | null>(null);
  const [region, setRegion]   = useState<Region>(DEFAULT_REGION);
  const [loadingLocation, setLoadingLocation] = useState(false);
 
  const mapRegion = useMemo(() => {
    if (!marker) return region;
    return { ...marker, latitudeDelta: 0.02, longitudeDelta: 0.02 };
  }, [marker, region]);

// Atualiza marcador e recentra o mapa
  const goToCoordinates = useCallback((coords: Coordinates) => {
    setMarker(coords);
    setRegion({ ...coords, latitudeDelta: 0.02, longitudeDelta: 0.02 });
    insertPokemonSightings(id, `${coords.latitude} ${coords.longitude}`)
    console.log(getPokemonSightings())
  }, []);
 
  // Toque no mapa → coloca pin
  const handleMapPress = useCallback((e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    goToCoordinates({ latitude, longitude });
  }, [goToCoordinates]);
 
  // Botão 'Minha localização'
  const handleUseMyLocation = useCallback(async () => {

  try {
      setLoadingLocation(true);
      let perm = permission;
      if (!perm?.granted) perm = await requestPermission();
      if (!perm?.granted) {
        Alert.alert('Permissão negada',
          'Ative a localização nas configurações do aparelho.');
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      goToCoordinates({
        latitude:  pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    } finally {
      setLoadingLocation(false);
    }
  }, [permission, requestPermission, goToCoordinates]);

  // Carregando permissões
  if (!permission) return (
    <View style={styles.center}>
      <ActivityIndicator color={theme.colors.primary} />
      <Text style={styles.text}>Carregando permissões...</Text>
    </View>
  );
 
  // Permissão negada → tela de pedido
  if (!permission.granted) return (
    <View style={styles.center}>
      <Text style={styles.text}>
        Precisamos da permissão de localização para marcar o avistamento.
      </Text>
      <TouchableOpacity style={styles.actionButton}
                        onPress={requestPermission}>
        <Text style={styles.actionText}>Permitir localização</Text>
      </TouchableOpacity>
    </View>
  );
 
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {marker ? (
          <Marker
            coordinate={marker}
            title={name ? `Avistamento: ${name}` : 'Avistamento'}
            description={`Pokémon #${id}`}
          />
        ) : null}
      </MapView>
 
      <View style={styles.panel}>
        <Text style={styles.title}>
          {name ? `${name} (#${id})` : `Pokémon #${id}`}
        </Text>
        <Text style={styles.subtitle}>
          Toque no mapa ou use sua localização para marcar o ponto.
        </Text>
        {marker ? (
          <Text style={styles.coords}>
            lat: {marker.latitude.toFixed(6)}  |
            lng: {marker.longitude.toFixed(6)}
          </Text>
        ) : (
          <Text style={styles.coords}>
            Nenhum ponto marcado ainda.
          </Text>
        )}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleUseMyLocation}
            disabled={loadingLocation}
          >
            {loadingLocation
              ? <ActivityIndicator color="#111" />
              : <Text style={styles.secondaryButtonText}>
                  Minha localização
                </Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}