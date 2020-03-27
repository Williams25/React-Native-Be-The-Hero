import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import logoImg from '../../assets/logo.png'

export default function Incidents() {
	const navigation = useNavigation();

	const navigateDetail = (incidentId) => {
		navigation.navigate('Detail')
	}

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{0}</Text> casos.
                </Text>
            </View>

            <Text style={styles.title}>
                Bem Vindo !
            </Text>

            <Text style={styles.description}>
                Ecolha um dos casos abaixo e salve um anaimal.
            </Text>

            <FlatList
                style={styles.incidentList}
								data={[1, 2, 3]}
								keyExtractor={incident => String(incident)}
								showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>
                            ONG:
                    </Text>
                        <Text style={styles.incidentValue}>
                            APD
                    </Text>

                        <Text style={styles.incidentProperty}>
                            CASO:
                    </Text>
                        <Text style={styles.incidentValue}>
                            CASO ACIDENTE
                    </Text>

                        <Text style={styles.incidentProperty}>
                            VALOR:
                    </Text>
                        <Text style={styles.incidentValue}>
                            $$
                    </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={navigateDetail}>
                            <Text style={styles.detailsButtonText}>
                                Ver mais detalhes
                        </Text>
                            <Feather name="arrow-right" size={17} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}