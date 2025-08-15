import { View, Text, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { getPost, getAllPosts } from '../repository/postRepository';
import Markdown from 'react-native-markdown-display';
import Head from 'expo-router/head';
import { logPageView } from '../analytics/ga4';

export async function generateStaticParams(): Promise<Record<string, string>[]> {
    const posts = await getAllPosts();
    return posts.map(post => ({ slug: post.slug }));
}

const PostDetailsPage = () => {
    const { slug } = useLocalSearchParams();
    const [post, setPost] = useState(null);
    const { width: windowWidth } = useWindowDimensions();
    const isSmallScreen = windowWidth < 1081;

    useEffect(() => {
        const fetchPost = async () => {
            if (slug && slug !== 'subscription') {
                const postData = await getPost(slug);
                setPost(postData);
            }
        };
        fetchPost();
    }, [slug]);

    useEffect(() => {
        logPageView();
    }, [slug]);

    const markdownStyles = StyleSheet.create({
        body: {
            fontSize: 16,
            color: 'black',
        },
        heading1: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        heading2: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        paragraph: {
            marginBottom: 10,
        },
        link: {
            color: 'blue',
            textDecorationLine: 'underline',
        },
    });

    if (slug === 'aboutPage') {
        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: 'white' }}
                contentContainerStyle={{
                    maxWidth: 960,
                    width: '100%',
                    marginHorizontal: 'auto',
                    padding: 20,
                    paddingBottom: isSmallScreen ? 50 : 0,
                }}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>About</Text>
                </View>
                <View style={styles.postContainer}>
                    <Markdown style={markdownStyles}>
                        {`A Seahawks blog dedicated to the latest updates, news, and insights about the Seattle Seahawks.
                        ‎ 
\n\n # Authors: Shrihun Sankepally and Nevin Tamilselvan
Shrihun and Nevin have longed to do something with the football community. Both sharing the passion for the Seahawks, Seahawks Today was born to share their ideas. Over the years, it has evolved to a prominent presence on social media, and has shifted to a platform to interview NFL players and coaches and give insight to the fans who long for Seahawks content.`}
                    </Markdown>
                </View>
            </ScrollView>
        );
    }

    if (slug === 'twitter') {
        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: 'white' }}
                contentContainerStyle={{
                    maxWidth: 960,
                    width: '100%',
                    marginHorizontal: 'auto',
                    padding: 20,
                    paddingBottom: isSmallScreen ? 50 : 0,
                }}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Social Media</Text>
                </View>
                <View style={styles.postContainer}>
                    <Markdown style={markdownStyles}>
                        {`Follow us on Twitter [here](https://twitter.com/todayseahawks) where we post daily tweets about all things Seahawks!
                         ‎ 
                         \n\n
# More social media coming soon!`}
                    </Markdown>
                </View>
            </ScrollView>
        );
    }

    if (slug === 'contactUs') {
        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: 'white' }}
                contentContainerStyle={{
                    maxWidth: 960,
                    width: '100%',
                    marginHorizontal: 'auto',
                    padding: 20,
                    paddingBottom: isSmallScreen ? 50 : 0,
                }}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Contact</Text>
                </View>
                <View style={styles.postContainer}>
                    <Markdown style={markdownStyles}>
                        {`You can reach us via email at [seahawkstoday24@gmail.com](mailto:seahawkstoday24@gmail.com)\n\n Reach out to us on Twitter [here](https://twitter.com/todayseahawks).`}
                    </Markdown>
                </View>
            </ScrollView>
        );
    }

    if (slug === 'subscription') {
        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: 'white' }}
                contentContainerStyle={{
                    maxWidth: 960,
                    width: '100%',
                    marginHorizontal: 'auto',
                    padding: 20,
                    paddingBottom: isSmallScreen ? 50 : 0,
                }}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Subscribe</Text>
                </View>
                <View style={styles.postContainer}>
                    <Text>Subscribe to Seahawks Today for free!.</Text>
                </View>
            </ScrollView>
        );
    }

    if (!post) {
        return <Text>Post not Found!</Text>;
    }

    return (
        <>
            <Head>
            <title>{post ? post.title : 'Loading...'}</title>
                <meta name="description" content={post ? post.description : 'Loading...'} />
                <meta property="og:image" content={post ? post.thumbnail : ''} />
                <meta name="twitter:card" content={post ? post.thumbnail : ''} />
                <meta name="twitter:site" content="@TodaySeahawks" />
                <meta name="twitter:title" content={post ? post.title : 'Loading...'} />
                <meta name="twitter:description" content={post ? post.description : 'Loading...'} />
                <meta name="twitter:image" content={post ? post.thumbnail : ''} />
            </Head>
            <ScrollView
                style={{ flex: 1, backgroundColor: 'white' }}
                contentContainerStyle={{
                    maxWidth: 960,
                    width: '100%',
                    marginHorizontal: 'auto',
                    padding: 20,
                    paddingBottom: isSmallScreen ? 50 : 0,
                }}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{post.title}</Text>
                </View>

                <Image
                    source={{ uri: post.thumbnail }}
                    style={{ width: '100%', aspectRatio: 16 / 9 }}
                    alt={post.title}
                />
                <View style={styles.postContainer}>
                    <Markdown style={markdownStyles}>{post.content}</Markdown>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    postContainer: {
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderColor: 'gold',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
});

export default PostDetailsPage;
