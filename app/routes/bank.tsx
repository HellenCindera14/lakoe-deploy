import { Box, Button, Flex, Input, Image, Text } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { AiOutlineClose } from 'react-icons/ai';
import Ali from '~/components/PopupBank';
import UpdateBank from '~/components/PopupBankUpdate';
import {
  createBank,
  deleteBankList,
  getBankList,
  updateBank,
} from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getBankList();
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  console.log('ini isi formData', formData);

  const bankId = formData.get('bankId');
  const actionType = formData.get('actionType');
  const name = formData.get('name');
  const bank_name = formData.get('bankName');
  const bank_number = formData.get('bankNumber');
  const updateName = formData.get('updateName');
  const updateBankName = formData.get('updateBankName');
  const updateBankNumber = formData.get('updateBankNumber');

  if (actionType === 'delete' && bankId) {
    await deleteBankList(parseInt(bankId as string));
    return redirect('/bank');
  }

  if (actionType === 'create' && name && bank_name && bank_number) {
    await createBank({
      name: name,
      bank_name: bank_name,
      bank_number: bank_number,
    });
    return redirect('/bank');
  }

  if (
    actionType === 'update' &&
    bankId &&
    updateName &&
    updateBankName &&
    updateBankNumber
  ) {
    const updated = await updateBank(
      parseInt(bankId as string),
      updateName as string,
      updateBankName as string,
      updateBankNumber as string
    );
    return console.log('data updated', updated);
  }
  return redirect('/bank');
}
// async function getBankNames() {
//   try {
//     const bankList = await prisma.BankAccount.findMany(); // Retrieves all records

//     // Extract bank_name values from the results
//     const bankNames = bankList.map((bank) => bank.bank_name);
//     // console.log("ini bankNames", bankNames);
//   } catch (error) {
//     console.error("Error fetching bank names:", error);
//   }
// }

export default function Bank() {
  const dataBank = useLoaderData<typeof loader>();

  return (
    <>
      <Box m={'2%'} boxShadow={'lg'}>
        <Box px={'15%'} bgColor={'#9ddce3'}>
          <Flex alignItems={'center'} p={3} justifyContent={'space-between'}>
            <Text
              bg={'white'}
              p={2}
              fontSize="13px"
              fontWeight={'700'}
              padding={'5px 10px'}
            >
              Akun Bank
            </Text>

            <Ali />
          </Flex>
        </Box>
        {dataBank.map((data) => (
          <Box px={'15%'} key={data.id}>
            <Flex
              w={'100%'}
              alignItems={'center'}
              p={2}
              justifyContent={'space-between'}
              bg={'white'}
            >
              <Box display={'flex'}>
                <Box display={'flex'} alignItems={'center'} mr={'5px'}>
                  <Image
                    src="https://1.bp.blogspot.com/-RBRQ4RehmHQ/Xy96Qc8ZNpI/AAAAAAAAPWo/tHLFo5RgR38iDKXFzaB9e7uEy4EdOyqTwCLcBGAsYHQ/s640/Bank%2BBCA%2BLogo%2B-%2BFree%2BVector%2BDownload%2BPNG.webp"
                    height={'15px'}
                  />
                </Box>

                <Text fontSize="13px">
                  <Text as={'span'} fontWeight={'700'}>
                    {data.bank_name}
                  </Text>
                  -{data.name}-{data.bank_number}
                </Text>
              </Box>
              <Box display={'flex'}>
                <Button
                  gap={5}
                  type="submit"
                  bg={'white'}
                  colorScheme="none"
                  color={'black'}
                >
                  <UpdateBank />
                </Button>
                <Form method="post">
                  <Input type="hidden" name="actionType" value="delete"></Input>
                  <Input type="hidden" name="bankId" value={data.id}></Input>
                  <Button
                    gap={5}
                    type="submit"
                    bg={'white'}
                    colorScheme="none"
                    color={'black'}
                  >
                    <AiOutlineClose />
                  </Button>
                </Form>
              </Box>
            </Flex>
          </Box>
        ))}
        {/* <Ali Alltrigger={buttonPopup} setTrigger={setButtonPopup}>
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={"white"}
            mt={5}
          >
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              bg={"white"}
              rounded={"xl"}
              p={0}
              my={12}
            >
              <FormControl id="" isRequired>
                <FormLabel>Bank</FormLabel>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Pilih Rekening Bank untuk menerima penarikan
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={"gray.600"}>
                        BRI
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={"gray.600"}>
                        BCA
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={"gray.600"}>
                        MANDIRI
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={"gray.600"}>
                        BNI
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Atas Nama</FormLabel>
                <Input
                  placeholder="Nama Pemilik Rekening"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nomor Rekening</FormLabel>
                <Input
                  placeholder="123456789"
                  _placeholder={{ color: "gray.500" }}
                  type="number"
                />
              </FormControl>
              <Stack spacing={6}>
                <Flex justifyContent={"end"} gap={3}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Tambah Akun Bank
                  </Button>
                </Flex>
              </Stack>
            </Stack>
          </Flex>
        </Ali> */}
      </Box>
    </>
  );
}
