import { Box, Image, Stack, Tooltip } from '@mantine/core';
import { links } from '../../lib';

const FloatingBar = () => {
  
  return (
    <Box
      pos="fixed"
      bottom={0}
      left={16}
      top="45%"
      style={{
        transform: 'translateY(-45%)',
        backgroundColor: 'white',
        borderRadius: '100px',
        boxShadow: '0px 6px 12px 0px #5C738314, 0px 4px 8px 0px #5C738314',
        padding: '4px',
        zIndex: 99,
        height: 'fit-content'
      }}
    >
      <Stack gap={8}>
        {
          links.map((link) => 
          <Tooltip label={link.text} key={link.text} position="right" offset={16} withArrow>
            <Box p={8} className='hover:bg-[#EFF1F6] rounded-full'>
              <Image src={link.icon} />
            </Box>
          </Tooltip>
        )}
      </Stack>
    </Box>
  );
}

export default FloatingBar