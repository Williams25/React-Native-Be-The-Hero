import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import logoImg from '../../assets/logo.png'
import api from '../../services/api'

export default function Incidents() {
    const navigation = useNavigation();

    const [incidents, setIncidents] = useState([])

    const [page, setPage] = useState(1),
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)

    const navigateDetail = (incidentId) => {
        navigation.navigate('Detail', {incidentId})
    }

    async function loadInidents() {
        if (loading) {
            return
        }

        if (total > 0 && incidents.length == total) {
            return
        }

        setLoading(true)

        const response = await api.get(`/incidents`, {
            params: {page}
        })

        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadInidents()
    }, [])

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
                data={[incidents]}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadInidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>
                            ONG:
                    </Text>
                        <Text style={styles.incidentValue}>
                            {item.name}
                        </Text>

                        <Text style={styles.incidentProperty}>
                            CASO:
                    </Text>
                        <Text style={styles.incidentValue}>
                            {item.title}
                        </Text>

                        <Text style={styles.incidentProperty}>
                            VALOR:
                    </Text>
                        <Text style={styles.incidentValue}>
                          {item.value}
                        </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateDetail(item)}>
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