import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import Box from '@/src/components/reusables/Box';
import LinearGradientBox from '@/src/components/reusables/LinearGradientBox';
import {scale} from '@/src/constants/scaler.constants';
import {useTheme} from '@/src/hooks/useTheme.hook';
import ThemedText from '@/src/components/reusables/ThemedText';
import {ThemedSearchInput} from '@/src/components/reusables/ThemedTextInput';
import ImageWrapper from '@/src/components/reusables/ImageWrapper';
import ImageSlider from '@/src/components/reusables/ImagesSlider';
import {useQuery} from '@tanstack/react-query';
import {fetchJson} from '@/src/utils/fetch.utils';
import {IpLocationResponse} from '@/src/types/locationinfo';
import ThemedButton, {
  ThemedIconButton,
} from '@/src/components/reusables/ThemedButton';
import ThemedIcon from '@/src/components/reusables/ThemedIcon';
import {sWidth} from '@/src/constants/dimensions.constants';
import Spacer from '@/src/components/reusables/Spacer';
import {useToast} from '@/src/components/toast-manager';
import useMainStore from '@/src/app/store2';
import {useSafeNavigation} from '@/src/hooks/useSafeNavigation';
import ThemedSwitchButton from '@/src/components/reusables/ThemedSwitchButton';
import {Product} from '@/src/types/product';
import {FlashList} from '@shopify/flash-list';
import Rating from '@/src/components/reusables/Rating';
import ThemedModal from '@/src/components/reusables/ThemedModal';

type Props = {};

const DashBoardScreen = (props: Props) => {
  const theme = useTheme();
  const toast = useToast();
  const [ip, setIp] = React.useState<string>('');
  const navigation = useSafeNavigation();
  const {theme: userTheme, setTheme} = useMainStore();
  const {
    data: products,
    error,
    isLoading: isIpLoading,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetchJson<Product[]>(
        `https://fakestoreapi.com/products`,
      );
      if (response.length > 0) {
        toast.showToast({
          type: 'success',
          title: 'Products fetched successfully',
        });
      } else {
        toast.showToast({
          type: 'error',
          title: 'IP Address not found',
        });
      }

      return response;
    },
  });
  return (
    <Box flex={1}>
      <Box width={'100%'} color={theme.text} px={scale(10)} align="flex-end">
        <ThemedSwitchButton
          label={
            userTheme === 'light' || userTheme === 'system'
              ? 'Light Theme'
              : 'Dark Theme'
          }
          labelProps={{
            weight: 'bold',
            color: theme.background,
          }}
          value={userTheme === 'light' || userTheme === 'system' ? false : true}
          onValueChange={() => {
            setTheme(userTheme === 'light' ? 'dark' : 'light');
          }}
        />
      </Box>
      <Box flex={1} gap={10} pa={10}>
        <FlashList
          data={products}
          renderItem={({item}) => <ProductItem product={item} />}
          keyExtractor={item => item.id.toString()}
        />
      </Box>
    </Box>
  );
};

export default DashBoardScreen;

const ProductItem = ({product}: {product: Product}) => {
  const theme = useTheme();
  const [openAddToCartModal, setAddToCartModal] = useState(false);
  return (
    <ThemedButton type="text">
      <ThemedModal
        visible={openAddToCartModal}
        onRequestClose={() => setAddToCartModal(false)}
        close={() => setAddToCartModal(false)}>
        <Box
          direction="column"
          gap={20}
          color={theme.background}
          pa={20}
          radius={scale(10)}>
          <ThemedText size="lg" weight="bold">
            Add to Cart
          </ThemedText>
          <ThemedText size="md">Quantity</ThemedText>
          <ThemedText size="md">Size</ThemedText>
          <Box direction="row" gap={10}>
            <ThemedButton label="Add to Cart" color={theme.danger} />
            <ThemedButton label="Cancel" />
          </Box>
        </Box>
      </ThemedModal>
      <Box
        borderWidth={1}
        borderColor={theme.text}
        my={10}
        direction="row"
        width={'100%'}
        radius={scale(10)}
        color={theme.background}
        pa={scale(10)}>
        <ImageWrapper
          width={sWidth / 2 - scale(20)}
          source={{uri: product.image}}
          height={scale(150)}
          resizeMode="contain"
        />
        <Box height={'100%'} justify="space-between">
          <ThemedText
            size={'xxs'}
            textProps={{
              numberOfLines: 2,
              ellipsizeMode: 'middle',
            }}>
            {product.title}
          </ThemedText>

          <Rating rating={product.rating.rate} />
          <ThemedText size="lg" weight="bold" color={theme.primary}>
            ${product.price}
          </ThemedText>
          <ThemedText size="sm" color={theme.primaryGray}>
            Category: {product.category}
          </ThemedText>
        </Box>
      </Box>
    </ThemedButton>
  );
};
